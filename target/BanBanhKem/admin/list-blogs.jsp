<%@ page import="vn.edu.hcmuaf.fit.model.Blog" %>
<%@ page import="java.util.List" %>
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
    <%--    css --%>
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
				<h6 class="mb-0">Thanh Thùy</h6>
				<span>Admin</span>
			</div>
		</div>
		<div class="navbar-nav w-100">
			<a href="./ListReceipt_Admin" class="nav-item nav-link "><i class="fa fa-tachometer-alt me-2"></i>Tổng quan</a>
			<a href="./ListProduct_Admin" class="nav-item nav-link"><i class="fa fa-th me-2"></i>DS Sản Phẩm</a>
			<a href="./ListCustomer" class="nav-item nav-link"><i class="fa fa-th me-2"></i>DS Khách Hàng</a>
			<a href="./ListBlog-admin" class="nav-item nav-link active"><i class="fa fa-th me-2"></i>DS Tin Tức</a>
			<a href="./ListReceipt_full_Admin" class="nav-item nav-link"><i class="fa fa-th me-2"></i>DS Đơn Hàng</a>
			<a href="add-product.jsp" class="nav-item nav-link"><i class="fa fa-birthday-cake me-2"></i>Thêm Sản Phẩm</a>
			<a href="add-blog.jsp" class="nav-item nav-link"><i class="fa fa-blog me-2"></i>Thêm Tin Tức</a>
            <a href="../Index" class="nav-item nav-link"><i class="fa fa-arrow-alt-circle-right me-2"></i>Về trang chủ</a>
			<!--  -->
		</div>
	</nav>
    </div>
    <!-- Sidebar End -->

    <!-- main content -->
    <% List<Blog> blogList = (List<Blog>) request.getAttribute("list");%>
    <main class="main bg-white">
        <div class="container-fluid bg-white">
            <div class="row">
                <!-- main title -->
                <div class="col-12">
                    <div class="main__title">
                        <h2>Danh sách tin tức</h2>
                        <span class="main__title-stat"><%=blogList.size()%></span>
                        <div class="main__title-wrap">
                            <!-- filter sort -->
                            <div class="filter" id="filter__sort">
                                <span class="filter__item-label">Sắp xếp:</span>

                                <div class="filter__item-btn dropdown-toggle" role="navigation" id="filter-sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <input type="button" value="Tên">
                                    <span></span>
                                </div>

                                <ul class="filter__item-menu dropdown-menu scrollbar-dropdown" aria-labelledby="filter-sort">
                                    <li>Tiêu đề</li>
                                    <li>Ngày đăng</li>
                                    
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
                                    <th>Tiêu đề</th>
                                    <th>Danh mục</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày đăng</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>
                       <% for (int i = 0; i < blogList.size(); i++) {
                       Blog blog = blogList.get(i) ; %>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="main__table-text"><%=i+1%></div>
                                    </td>
                                    <td>
                                        <div class="main__user">
                                           
                                            <div class="main__meta">
                                                <h3><%=blog.getCategory()%></h3>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="main__table-text"><%=blog.getListdanhmuc().get(0)%></div>
                                    </td>
                                    
                                    <td>
                                        <div class="main__table-text main__table-text--green">Đã phê duyệt</div>
                                    </td>
                                    <td>
                                        <div class="main__table-text"><%=blog.getDate()%></div>
                                    </td>
                                    <td>
                                        <div class="main__table-btns">
                                            <a href="#modal-status" class="main__table-btn main__table-btn--banned open-modal">
                                                <i class="fa fa-lock"></i>
                                            </a>
                                            <a href="EditBlog?idB=<%=blog.getId()%>" class="main__table-btn main__table-btn--edit">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                            <a href="#modal-delete" class="main__table-btn main__table-btn--delete open-modal">
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </div>
                                </td>
                                </tr>
                            </tbody>
                            <% } %>
                        </table>
                    </div>
                </div>
                <!-- end users -->

                <!-- paginator -->
                <div class="col-12">
                    <div class="paginator-wrap">
                        <span><%=blogList.size()%>/<%=blogList.size()%> Bài viết</span>

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

    <!-- modal status -->
    <div id="modal-status" class="zoom-anim-dialog mfp-hide modal">
        <h6 class="modal__title">Ẩn Tin Tức</h6>

        <p class="modal__text">Bạn có chắc muốn ẩn bài viết này?</p>

        <div class="modal__btns">
            <button class="modal__btn modal__btn--apply" type="button">Ẩn</button>
            <button class="modal__btn modal__btn--dismiss" type="button">Quay lại</button>
        </div>
    </div>
    <!-- end modal status -->

    <!-- modal delete -->
    <div id="modal-delete" class="zoom-anim-dialog mfp-hide modal">
        <h6 class="modal__title">Xóa Tin Tức</h6>

        <p class="modal__text">Bạn có chắc muốn xóa bài viết này?</p>

        <div class="modal__btns">
            <button class="modal__btn modal__btn--apply" type="button">Xóa</button>
            <button class="modal__btn modal__btn--dismiss" type="button">Quay lại</button>
        </div>
    </div>
    <!-- end modal delete -->

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