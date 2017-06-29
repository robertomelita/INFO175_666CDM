

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetAE666
 * 
 * Ver el método doGet
 */
@WebServlet("/GetAE666")
public class GetAE666 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private DBInterfaceAE666 dbInterface; // dbInterface es para conectarse a la base de datos
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAE666() {
        super();
    }

	/**
	 * doGet es invocada cuando un servlet es llamado con método http GET, que es lo mismo
	 * que cargar su URL en un browser.
	 * 
	 * Los parámetros sonobjetos útiles que nos sirven para saber más de la llamada (request)
	 * y para escribir la respuesta HTTP (response)
	 * 
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Usamos esta clase ConfigManager para leer y cargar variables de configuración 
		// definidas en el archivo config.xml
		ConfigManager cm = new ConfigManager(this);
		
		// Un ejemplo de como capturar un parametr de url. Si el paramtero no viene en la url, la variable se le asignará null
		String userId = request.getParameter("userid");
		
		// otro ejemplo de paramtero entero donde hay involucrada una conversión a int. Al final
		// resulta más fácil manejar la exception que tratar de validar de otra forma
		int limit = -1;
		try{
			limit = Integer.parseInt(request.getParameter("limit"));
		}
		catch(Exception e){
			limit = -1;
		}
		
		// Se inicializa el objeto de conexión a la base de datos
		dbInterface = new DBInterfaceAE666(cm.dbString, cm.dbUser, cm.dbPass);
		dbInterface.openConnection(); // abrir la conexión
		
		// llamada a la función GetAE666 que hace la consulta a la base de datos
		ArrayList<String[]> data = dbInterface.GetAE666(); 
		dbInterface.closeConnection(); // cerrar la conexión
		
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		PrintWriter out = response.getWriter();
		
		// escribir la respuesta
		out.print(outAsJSON(data));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// si queremos que elservicio haga lomismo si es cargado con protocolo POST 
		// entonces podemos simplemente llamar doGet
		doGet(request,response);
	}
	
	/**
	 * Este metodo escribe en formato JSON la data obtenida desde la base de datos
	 * 
	 * @param data
	 * @return
	 */
	private String outAsJSON(ArrayList<String[]> data){
		String outString = "[";
		for(String[] row : data){
			outString += "\n    {\"appid\":\""+row[0]+"\",\"topicname\":\""+row[1]+"\",\"activityname\":\""+row[2]+"\",\"tiempo_promedio\":\""+row[3]+"\",\"nivel_completacion\":\""+row[4]+"\"},";
		}
		outString = outString.substring(0,outString.length()-1);
		outString += "\n]";
		return outString;
	}
}
