package vn.edu.hcmuaf.fit.service;

import vn.edu.hcmuaf.fit.bean.User;
import vn.edu.hcmuaf.fit.db.DBConnect;
import vn.edu.hcmuaf.fit.db.JDBIConnector;
import vn.edu.hcmuaf.fit.model.Account;
import vn.edu.hcmuaf.fit.model.Order;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;


import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;


public class UserService {
    private static UserService instance;

    private UserService() {
    }

    public static UserService getInstance() {
        if (instance == null) {
            instance = new UserService();
        }
        return instance;
    }
    public User checkLogin(String email, String password) {
        List<User> users = JDBIConnector.get().withHandle(h ->
                h.createQuery("SELECT taikhoan.ID, taikhoan.email, taikhoan.PASS, taikhoan.tentk, taikhoan.ROLE FROM taikhoan WHERE email = ?")
                        .bind(0, email)
                        .mapToBean(User.class)
                        .stream()
                        .collect(Collectors.toList())
        );
        if (users.size() != 1) return null;
        User user = users.get(0);
        if (!user.getPass().equals(hashPassword(password))
                ||!user.getEmail().equals(email)
        ) return null;
        return user;
    }
    public static String hashPassword(String password) {
        try {
            MessageDigest sha256 = null;
            sha256 = MessageDigest.getInstance("SHA-256");
            byte[] hash = sha256.digest(password.getBytes());
            BigInteger number = new BigInteger(1, hash);
            return number.toString(16);
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }
    public static User findById(String Id){
        List<User> list = getListAcc();
        for (User u: list) {
            if(Id.equals(u.getId())){
                return u;
            }

        }
        return null;
    }

    public static List<User> getListAcc(){
        List<User> list = new ArrayList<User>();
        Statement statement = DBConnect.getInstall().get();
        if(statement !=null){
            try{
                ResultSet rsAcc = statement.executeQuery("select ID, EMAIL, PASS, TENTK, ROLE from taikhoan;");
                while(rsAcc.next()){
                    list.add(new User(rsAcc.getString(1), rsAcc.getString(2), rsAcc.getString(3), rsAcc.getString(4), rsAcc.getInt(5)));
                }
            }
            catch (SQLException e){
                e.printStackTrace();
            }
        }
        else{
            System.out.println("Không có tai khoan");
        }
        return list;

    }
    public static String getLastMaTK(){
        Statement statement = DBConnect.getInstall().get();
        String result = "";
        if (statement != null)
            try {
                ResultSet rs = statement.executeQuery("SELECT taikhoan.ID from taikhoan ORDER BY ID DESC LIMIT 1");
                while (rs.next()){
                    result = rs.getString(1);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        else {
            System.out.println("Không có đơn hàng");
        }
        return  result;
    }
    public static boolean checkEmail(String email){
        List<User> list = getListAcc();
        List<String> listEmail = new ArrayList<String>();
        for(User a : list){
            listEmail.add(a.getEmail());
        }
        if (!listEmail.contains(email)) {
            return true;
        }
        return false;
    }
    public static void register(User acc){
        Statement stm = DBConnect.getInstall().get();
        String stt = getLastMaTK().substring(2);
        String ID = "AD" + (Integer.parseInt(stt) + 1);
        acc.setId(ID);
        if(stm!= null) {
            try {
                String sql = "insert into taikhoan values ('" + ID + "', '" + acc.getEmail() + "', '"
                        + hashPassword(acc.getPass())  + "', '" + acc.getTentk() + "'," + acc.getRole()+");";
                stm.executeUpdate(sql);
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
    }

    public static int randomCode(){
        return  (int) Math.floor(((Math.random() * 899999) + 100000));
    }
    public  static void sendMail(String toEmail, int code) throws MessagingException, UnsupportedEncodingException {
        String fromEmail= "group27web@gmail.com";
        String pass =  "imvwmzsvffvjtgpr";
        Properties props = new Properties();

        props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
        props.put("mail.smtp.port", "587"); //TLS Port
        props.put("mail.smtp.auth", "true"); //enable authentication
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        // get Session
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, pass);
            }
        });

        // compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("Xác minh tài khoản");
            message.setText("Mã xác nhận của bạn là: " + code);

            // send message
            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
    public static void updatePass(String email, String pass)  {
        String sql = "UPDATE taikhoan set PASS = '"+pass+"' where EMAIL like "+ "'"+email+"'";
        Statement stm  =  DBConnect.getInstall().get();
        try {
            stm.executeUpdate(sql);

        } catch (SQLException se) {
            se.printStackTrace();
        }
    }

    public static void updateProfileEmail(String email, User auth)  {
        if(email == null) return;
        String idACC = auth.getId();
        String sql = "UPDATE taikhoan set EMAIL = '"+email+"' where ID = "+ "'"+idACC+"'";
        Statement stm  =  DBConnect.getInstall().get();
        try {
            stm.executeUpdate(sql);
            auth.setEmail(email);
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
    public static void updateProfileTenTk(String tentk,User auth)  {
        if(tentk == null) return;
        String idACC = auth.getId();
        String sql = "UPDATE taikhoan set TENTK = '"+tentk+"' where ID = "+ "'"+idACC+"'";
        Statement stm  =  DBConnect.getInstall().get();
        try {
            stm.executeUpdate(sql);
            auth.setTentk(tentk);
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
    public static void updateProfileAddress(String diachi, User auth)  {
        if(diachi == null) return;
        String idACC = auth.getId();
        String sql1 = "UPDATE khachhang set khachhang.DIACHI = '"+diachi+"'where khachhang.MATAIKHOAN = "+ "'"+idACC+"'";
        Statement stm  =  DBConnect.getInstall().get();
        try {
            stm.executeUpdate(sql1);
            CustomerService.getCusByIdAcc(auth.getId()).setDIACHI(diachi);
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
    public static void updateProfilePhoneNo(String sdt, User auth)  {
        if(sdt == null) return;
        String idACC = auth.getId();
        String sql1 = "UPDATE khachhang set khachhang.SDT = '"+sdt+"' where khachhang.MATAIKHOAN = "+ "'"+idACC+"'";
        Statement stm  =  DBConnect.getInstall().get();
        try {
            stm.executeUpdate(sql1);
            CustomerService.getCusByIdAcc(auth.getId()).setSDT(sdt);
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
    public static void main(String[] args) throws MessagingException, UnsupportedEncodingException, SQLException {
//        UserService userService = new UserService();
//       System.out.println(userService.checkLogin("thanhthuy@gmail.com", "123").toString());
//       System.out.println(userService.hashPassword("123"));
//       System.out.println(userService.hashPassword("456"));
//       System.out.println(userService.hashPassword("789"));
//       System.out.println(userService.hashPassword("nhom27"));
//        UserService.register(new Account("Thanh@gmail.com","12","Thanh"));

//        System.out.println(UserService.checkEmail("thanh@gmail.com"));
//        sendMail("thanhtamv14717@gmail.com", randomCode());
//        updatePass("thanhtamv14717@gmail.com", hashPassword("123"));
    }
}
