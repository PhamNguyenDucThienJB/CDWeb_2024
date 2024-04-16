<%@ page import="vn.edu.hcmuaf.fit.model.Customer" %>
<%@ page import="vn.edu.hcmuaf.fit.bean.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<% User auth = (User) session.getAttribute("auth");
  Customer customer = (Customer) session.getAttribute("cust");%>

<!-- rang cua -->
<%--<div class="rang_cua"></div>--%>
<!-- rang cua -->
<%--header-top--%>
<div class="header__top" style="padding-top: 20px;padding-bottom: 20px  ;border-radius: 0px 0px 15px 15px">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6">
        <div class="header__top__left">
          <ul>
            <li style="color: wheat"><i style="font-size: 30px" class="fa fa-building"></i>Hệ Thống Các Của Hàng</li>
<%--            <li style="color: wheat">Số Điện Thoại</li>--%>
            <li style="color: wheat"><i  style="font-size: 30px" class="fa fa-phone"></i>0795035755</li>
<%--            <li style="color: wheat"><i class="fa fa-envelope"></i>Hệ Thống Các Của Hàng</li>--%>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 col-md-6">
        <div class="header__top__right">
          <div class="header__top__right__social">
            <a href="" target="blank" style="font-size: 20px;"><i class="fa fa-facebook"></i></a>
            <a href="" target="blank"style="font-size: 20px;"><i class="fa fa-comment"></i></a>
            <a href="" target="blank"style="font-size: 20px;"><i class="fa fa-instagram"></i></a>
          </div>
          <div class="header__top__right__auth">
            <a style="font-size: 20px;" href="<%=auth == null ?"signin.jsp":""%>"><i class="fa fa-user"></i></i><%= auth != null ? auth.getTentk():"Đăng nhập"%></a>
            <% if(auth != null) { %>
            <div class="header__top__right__auth__dropdown">
              <a href="/BanBanhKemSinhNhatWebProject/MyOrder" method="get" class="dropdown-item">Đơn hàng của tôi</a>
              <a href="/BanBanhKemSinhNhatWebProject/EditUserProfile" method="get" class="dropdown-item">Hồ sơ của tôi</a>
              <a onclick="checkPass('<%=auth.getEmail()%>','<%=auth.getPass()%>')" class="dropdown-item">Đặt lại mật khẩu</a>
              <% if(auth.checkRole(1)) { %>
              <a href="/BanBanhKemSinhNhatWebProject/admin/Admin" class="dropdown-item">Vào trang quản lí</a>
              <%}%>
              <a href="/BanBanhKemSinhNhatWebProject/doSignOut" method="get" class="dropdown-item">Đăng xuất</a>
            </div>
            <%}%>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<%--header-top--%>
