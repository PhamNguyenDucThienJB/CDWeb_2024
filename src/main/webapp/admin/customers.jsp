<%@ page import="vn.edu.hcmuaf.fit.bean.User" %>
<%@ page import="java.util.List" %>
<%@ page import="vn.edu.hcmuaf.fit.model.Customer" %>
<%@ page import="vn.edu.hcmuaf.fit.service.UserService" %>
<%@ page import="vn.edu.hcmuaf.fit.service.CustomerService" %>
<%@ page contentType="text/html;charsetUTF-8" language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<!-- Icon Font Stylesheet -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    
	<!-- CSS -->
    <link rel="stylesheet" href="css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">
    <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="css/select2.min.css">
    <link rel="stylesheet" href="css/ionicons.min.css">


    <!-- Favicons -->
    <link rel="icon" type="image/png" href="icon/favicon-32x32.png" sizes="32x32">
    <link rel="apple-touch-icon" href="icon/favicon-32x32.png">

	<!-- boostrap -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
    <%--  admin  css --%>
    <link rel="stylesheet" href="css/admin.css">
	<!-- index css -->
	<link rel="stylesheet" href="./css/style.css" >

	<link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />


    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Dmitry Volkov">
	<title>Admin | Shop Bánh Kem</title>
</head>

<body>
<% User auth = (User) session.getAttribute("auth");%>
    <!-- header -->
    <header class="header">
        <div class="header__content">
            <!-- header logo -->
            <a href="./ListReceipt_Admin" class="header__logo">
				<img src="../img/logo_web.jpg" alt="">
			</a>
            <!-- end header logo -->

            <!-- header menu btn -->
            <button class="header__btn" type="button">
				<span></span>
				<span></span>
				<span></span>
			</button>
            <!-- end header menu btn -->
        </div>
    </header>
    <!-- end header -->

             <!-- Sidebar Start -->
   <div class="sidebar pe-4 pb-3">
	<nav class="navbar bg-pink navbar-dark">

		<div class="d-flex align-items-center ms-4 mb-4">
			<div class="position-relative">
				<i class="fa fa-user icon__user"></i>
				<div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
			</div>
			<div class="ms-3">
                <h6 class="mb-0"><%= auth != null ? auth.getTentk():"ADMIN"%></h6>
				<span>Admin</span>
			</div>
		</div>
		<div class="navbar-nav w-100">
			<a href="./ListReceipt_Admin" class="nav-item nav-link "><i class="fa fa-tachometer-alt me-2"></i>Tổng quan</a>
			<a href="./ListProduct_Admin" class="nav-item nav-link"><i class="fa fa-th me-2"></i>DS Sản Phẩm</a>
			<a href="./ListCustomer" class="nav-item nav-link active"><i class="fa fa-th me-2"></i>DS Khách Hàng</a>
			<a href="./ListBlog-admin" class="nav-item nav-link "><i class="fa fa-th me-2"></i>DS Tin Tức</a>
			<a href="./ListReceipt_full_Admin" class="nav-item nav-link "><i class="fa fa-th me-2"></i>DS Đơn Hàng</a>
			<a href="add-product.jsp" class="nav-item nav-link"><i class="fa fa-birthday-cake me-2"></i>Thêm Sản Phẩm</a>
			<a href="add-blog.jsp" class="nav-item nav-link"><i class="fa fa-blog me-2"></i>Thêm Tin Tức</a>
            <a href="../Index" class="nav-item nav-link"><i class="fa fa-arrow-alt-circle-right me-2"></i>Về trang chủ</a>
			<!--  -->
		</div>
	</nav>
    </div>
    <!-- Sidebar End -->
<%List<Customer> listC = (List<Customer>) request.getAttribute("listCus");%>
    <!-- main content -->
    <main class="main bg-white">
        <div class="container-fluid bg-white">
            <div class="row">
                <!-- main title -->
                <div class="col-12">
                    <div class="main__title">
                        <h2>Danh sách khách hàng</h2>

                        <span class="main__title-stat"><%=listC.size()%></span>

                        <div class="main__title-wrap">
                            <!-- filter sort -->
                            <div class="filter" id="filter__sort">
                                <span class="filter__item-label">Sắp xếp:</span>

                                <div class="filter__item-btn dropdown-toggle" role="navigation" id="filter-sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <input type="button" value="Tên">
                                    <span></span>
                                </div>

                                <ul class="filter__item-menu dropdown-menu scrollbar-dropdown" aria-labelledby="filter-sort">
                                    <li>Tên</li>
                                    <li>Địa chỉ</li>
                                    
                                </ul>
                            </div>
                            <!-- end filter sort -->

                            <!-- search -->
                            <form action="#" class="main__title-form">
                                <input type="text" placeholder="Tìm kiếm..">
                                <button type="button">
									<i class="fa fa-search"></i>
								</button>
                            </form>
                            <!-- end search -->
                        </div>
                    </div>
                </div>
                <!-- end main title -->

                <!-- users -->
                <div class="col-12 bg-pink">
                    <div class="main__table-wrap">
                        <table class="main__table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>SĐT</th>
                                    <th>Quyền</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>

                            <tbody>
                            <%
                                int i = 1;
                            for(Customer customer:listC){
                            %>
                                <tr>
                                    <td>
                                        <div class="main__table-text"><%=i%></div>
                                    </td>
                                    <td>
                                        <div class="main__user">
                                            <div class="main__avatar">
                                                <img src="img/user.svg" alt="">
                                            </div>
                                            <div class="main__meta">
                                                <h3><%=customer.getTENKH()%></h3>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="main__table-text"><%=customer.getDIACHI()%></div>
                                    </td>
                                    <td>
                                        <div class="main__table-text"><%=customer.getSDT()%></div>
                                    </td>
                                   
                                    <td>
                                        <% String main__table = " ";
                                            String main__btn ="";
                                            if(customer.getRoleNo() == -1){
                                                main__table = "main__table-text--red";
                                                main__btn = "main__table-btn--delete";
                                            } else if(customer.getRoleNo() == 1){
                                                main__table = "main__table-text--green";
                                                main__btn = "main__table-btn--banned";
                                            }else{
                                                main__table = "main__table-text--black";
                                                main__btn = "main__table-btn--banned";
                                            }%>
                                        <div class="main__table-text <%=main__table%>"><%=customer.getRole()%></div>
                                    </td>

                                    <td>
                                        <div class="main__table-btns">
                                            <a href="#modal-status<%=i%>" class="main__table-btn <%=main__btn%> open-modal">
                                                <i class="fa fa-lock"></i>
                                            </a>
                                            <a href="./EditUser?makh=<%=customer.getMAKH()%>" class="main__table-btn main__table-btn--edit">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                            <a href="#modal-delete<%=i%>" class="main__table-btn main__table-btn--delete open-modal">
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </div>

                                    </td>
                                </tr>
                            <!-- modal status -->
                            <div id="modal-status<%=i%>" class="zoom-anim-dialog mfp-hide modal">
                                <form method="post" action="AdminLockCus">
                                    <h6 class="modal__title">Chặn Người Dùng</h6>
                                    <p class="modal__text">Bạn có chắc muốn chặn người dùng này?</p>
                                    <input name = "makh" value="<%=customer.getMAKH()%>" style="display: none">
                                    <div class="modal__btns">
                                        <button class="modal__btn modal__btn--apply" type="submit">Chặn</button>
                                        <button class="modal__btn modal__btn--dismiss" type="button">Quay lại</button>
                                    </div>
                                </form>
                            </div>
                            <!-- modal delete -->
                            <div id="modal-delete<%=i%>" class="zoom-anim-dialog mfp-hide modal">
                                <h6 class="modal__title">Xóa Khách Hàng</h6>

                                <p class="modal__text">Bạn có chắc muốn xóa khách hàng này?</p>

                                <div class="modal__btns">
                                    <a href="DeleteUser?makh=<%=customer.getMAKH()%>" class="modal__btn modal__btn--apply" type="button">
                                        Xóa
                                    </a>
                                    <button class="modal__btn modal__btn--dismiss" type="button">Quay lại</button>
                                </div>
                            </div>
                            <!-- end modal delete -->
                               <% i++;
                            }%>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- end users -->

                <!-- paginator -->
                <div class="col-12">
                    <div class="paginator-wrap">
                        <span>3/3 khách hàng</span>

                        <ul class="paginator">
                            <li class="paginator__item paginator__item--prev">
                                <a href="#"><i class="fa fa-chevron-left"></i></a>
                            </li>
                            <li class="paginator__item"><a href="#">1</a></li>
                            <li class="paginator__item paginator__item--active"><a href="#">2</a></li>
                            <li class="paginator__item"><a href="#">3</a></li>
                            <li class="paginator__item"><a href="#">4</a></li>
                            <li class="paginator__item paginator__item--next">
                                <a href="#"><i class="fa fa-chevron-right"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- end paginator -->
            </div>
        </div>
    </main>
    <!-- end main content -->




     <!-- Back to Top -->
     <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>

    <!-- JS -->
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/jquery.mousewheel.min.js"></script>
    <script src="js/jquery.mCustomScrollbar.min.js"></script>
    <script src="js/select2.min.js"></script>
    <script src="js/admin.js"></script>
	
  
</body>

</html>