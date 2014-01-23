package queryPackage;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.*;


/**
 * Servlet implementation class genericServlet
 */
@WebServlet("/genericServlet")
public class genericServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static String USERNAME = new  String ("hr");
	public static String PASSWORD  = new  String ("hr");  
    /**
     * @see HttpServlet#HttpServlet()
     */
    public genericServlet() {
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
		String filter = request.getParameter("band");
		response.setContentType("text/XML");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		PrintWriter out  = response.getWriter();
		StringBuffer buff = new StringBuffer();
		buff.append("<?xml version=\"1.0\"?>");
		try
        {
        // Load the Oracle Driver
        Class.forName("oracle.jdbc.driver.OracleDriver");
        }
        catch(ClassNotFoundException e)
        {
        	
        }
		try
		{
			Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", USERNAME, PASSWORD);
			PreparedStatement psSelect;
			if (filter.equals("nofilter")){
				String selectEntire = "Select * from stellar_data order by band,type";
			    psSelect =con.prepareStatement(selectEntire);
			}
			else{
				String selectEntire = "Select * from stellar_data where band=? order by band,type";
				psSelect =con.prepareStatement(selectEntire);
				psSelect.setString(1, filter);
			}
			ResultSet rs = psSelect.executeQuery();
			buff.append("<data>");
			while(rs.next()){
				buff.append("<object>");
				//Double ra = new Double(rs.getString("ra"));
				//int hh = (int) Math.floor(ra * 24 /360);
				//int min = ((ra * 24)%360)*60;
				
				
				//Double dec = new Double(rs.getString("dec"));
				buff.append("<ra>").append(rs.getString("ra")).append("</ra>");
				buff.append("<dec>").append(rs.getString("dec")).append("</dec>");
				buff.append("<band>").append(rs.getString("band")).append("</band>");
				buff.append("<obj_name>").append(rs.getString("obj_name")).append("</obj_name>");
				buff.append("<type>").append(rs.getString("type")).append("</type>");
				String filename1 = rs.getString("filename");
				Pattern f = Pattern.compile("^.*/(.*)$");
				Matcher mf = f.matcher(filename1);
				if(mf.find()){
					filename1 = mf.group(1);
				}
				Pattern ip = Pattern.compile("^.*/(.*)([Hjk]).dat$");
				Matcher im = ip.matcher(rs.getString("filename"));
				String id = "";
				if(im.find()){
					id = im.group(2).toLowerCase()+im.group(1);
				}
				buff.append("<ident>").append(id).append("</ident>");
				buff.append("<filename>").append(filename1).append("</filename>");
				buff.append("</object>");
			}
			
			psSelect.close();
			con.close();
		
		}
		catch(SQLException e)
        {
            	
        }
		buff.append("</data>");
		out.println(buff.toString());
		out.flush();
		out.close();
	}

}
