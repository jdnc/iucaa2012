package queryPackage;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.util.*;

/**
 * Servlet implementation class queryServlet
 */
@WebServlet("/queryServlet")
public class queryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public queryServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/plain");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		PrintWriter out  = response.getWriter();
		out.append("<?xml version=\"1.0\"?>");
		List <String> list = new ArrayList<String>();
		list.add("/home/rkgv/Ram.sh");
		Enumeration enum1 = request.getParameterNames();
		while(enum1.hasMoreElements()){
			String name = (String) enum1.nextElement();
			String value = request.getParameter(name);
			list.add(value);
			
		}
		String[] cmd = new String [list.size() ];
		cmd = list.toArray(cmd);
		
		for(String s : cmd)
			System.out.println(s);
		Runtime runtime = Runtime.getRuntime();
		Process process = null;
		try{
			System.out.println("Working Directory = " +
			           System.getProperty("user.dir"));
			File dir = new File("/home/rkgv");
			process = runtime.exec(cmd, null, dir);
			BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line = null;
		      while ((line = in.readLine()) != null) {
		        System.out.println(line);
		      }
		      int exitVal = process.waitFor();
	            System.out.println("Process exitValue: " + exitVal);
		}
		catch (Exception e){
			System.out.println("Problem with script: ");
			e.printStackTrace();
		}
	}

}
