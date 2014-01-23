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
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.*;

/**
 * Servlet implementation class raDecServlet
 */
@WebServlet("/raDecServlet")
public class raDecServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static String USERNAME = new  String ("hr");
	public static String PASSWORD  = new  String ("hr");
    /**
     * @see HttpServlet#HttpServlet()
     */
    public raDecServlet() {
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
		String rvalue = request.getParameter("raVal");
		String dvalue = request.getParameter("decVal");
		Double ra = 0.0;
		Double dec = 0.0;
		response.setContentType("text/XML");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		PrintWriter out  = response.getWriter();
		out.append("<?xml version=\"1.0\"?>");
		Pattern p =Pattern.compile("(^-?)([0-9]*):([0-9]*):(.*)");
		Matcher mRa = p.matcher(rvalue);
		if(mRa.find()){
		Integer hrRa = new Integer (mRa.group(2));
		Integer minRa = new Integer (mRa.group(3));
		Double secRa = new Double (mRa.group(4));
		 ra = (hrRa + minRa/60.0 + secRa/3600.0) * 360.0/24.0 ;
		}
		else{
			Integer hrRa = new Integer (0);
			Integer minRa = new Integer (0);
			Double secRa = new Double (0);
			
		}
		if(mRa.group(1).equals("-")){
			ra = 0.0 - ra;
		}
		Matcher mDec = p.matcher(dvalue);
		if(mDec.find()){
		Integer hrDec = new Integer (mDec.group(2));
		Integer minDec = new Integer (mDec.group(3));
		Double secDec = new Double (mDec.group(4));
		 dec = (hrDec + minDec/60.0 + secDec/3600.0);
		}
		else{
			Integer hrDec = new Integer (0);
			Integer minDec = new Integer (0);
			Double secDec = new Double (0);
			
		}
		
		if(mDec.group(1).equals("-")){
			dec = 0.0 - dec;
		}
		if(dec < 0){
			dec=Math.ceil(dec);
		}
		else dec = Math.floor(dec);
		if(ra < 0){
			ra = Math.ceil(ra);
		}
		else ra=Math.floor(ra);
		DecimalFormat df = new DecimalFormat("#");
        String raString = df.format(ra);
        String decString = df.format(dec);
		System.out.println("dec="+decString);
		System.out.println("ra="+raString);
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
			String sqlSelect = new String("Select * from stellar_data where trunc(ra)=? and trunc(dec)=?");
			PreparedStatement psSelect =con.prepareStatement(sqlSelect) ;
			psSelect.setString(1, raString);
			psSelect.setString(2,decString);
			ResultSet rs = psSelect.executeQuery();
			out.append("<data>");
			while(rs.next()){
				out.append("<object>");
				out.append("<band>").append(rs.getString("band")).append("</band>");
				out.append("<obj_name>").append(rs.getString("obj_name")).append("</obj_name>");
				out.append("<type>").append(rs.getString("type")).append("</type>");
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
				out.append("<ident>").append(id).append("</ident>");
				out.append("<filename>").append(filename1).append("</filename>");
				out.append("</object>");
			}
			
			psSelect.close();
			con.close();
		}
		catch(SQLException e)
        {
            	
        }
		out.append("</data>");
	}

}
