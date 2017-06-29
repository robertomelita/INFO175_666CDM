import java.sql.*; 
import java.util.*;

/**
 * Esta clase implementa metodos de conexión y consula a una base de datos.
 * 
 *
 */
public class DBInterfaceQP {
	protected String dbString;
	protected String dbUser;
	protected String dbPass;
	
	protected Connection conn;
	protected Statement stmt = null; 
	protected ResultSet rs = null;
	
	public DBInterfaceQP(String connurl, String user, String pass){
		dbString = connurl;
		dbUser = user;
		dbPass = pass;
	}
	
	public boolean openConnection(){
		try{
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			
			conn = DriverManager.getConnection(dbString+"?"+ "user="+dbUser+"&password="+dbPass);
			if (conn!=null){
				return true;
			}
		}catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage()); 
			System.out.println("SQLState: " + ex.getSQLState()); 
			System.out.println("VendorError: " + ex.getErrorCode());
			return false;
		}catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return true; 
	}
	
	public  void closeConnection(){
		releaseStatement(stmt, rs);
		if (conn != null){
			try{
				conn.close();
			}catch (SQLException sqlEx) { } 
		}
	}
	
	
	public  void releaseStatement(Statement stmt, ResultSet rs){
		if (rs != null) {
			try { 
				rs.close();
			}catch (SQLException sqlEx) { sqlEx.printStackTrace(); } 
			rs = null;
		}
		if (stmt != null) {
			try{
				stmt.close();
			}catch (SQLException sqlEx) { sqlEx.printStackTrace(); } 
			stmt = null;
		}
	}
	
	/**
	 * Ejemplo de metodo que hace una consulta a la base de datos
	 * (esta es una consulta de pruebas, que sólo trae información parcial
	 * @return
	 */
	public ArrayList<String[]> GetQP666() {
		try {
			ArrayList<String[]> res = new ArrayList<String[]>();
			stmt = conn.createStatement();
			
			String query = "select `appid`,`topicname`,`activityname`,(avgresum/(avgmax+1))as `success_rate`, avgtime as `tiempo_prom`,avgmax+1 as `intentos` from viewqp2 order by topicname;";
			rs = stmt.executeQuery(query);
			
			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			while (rs.next()) {
				String[] dataPoint = new String[6];
				dataPoint[0] = rs.getString("appid"); // rs.getString obtiene el valor String de un campo especifico consultado, en este caso el campo "user". Notar que este nombre de campodebe coincidir con los campos en la consulta (SELECT `user`, ...) 
				dataPoint[1] = rs.getString("topicname");
				dataPoint[2] = rs.getString("activityname");
				dataPoint[3] = rs.getString("success_rate");
				dataPoint[4] = rs.getString("tiempo_prom");
				dataPoint[5] = rs.getString("intentos");
				res.add(dataPoint);
				
			}
			this.releaseStatement(stmt, rs);
			return res;
		}
		catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			this.releaseStatement(stmt, rs);
			return null;
		}
	}
	
}
