package vn.edu.hcmuaf.fit.controller.admin.Product;

import vn.edu.hcmuaf.fit.model.Product;
import vn.edu.hcmuaf.fit.service.ProductService;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "Edit_Product", value = "/admin/Edit_Product")
public class Edit_Product extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Product p = ProductService.findById(request.getParameter("idP"));
        request.setAttribute("product",p);
        List<String> listSize = new ArrayList<String>();
        listSize.add("Bé");
        listSize.add("Nhỏ");
        listSize.add("Vừa");
        listSize.add("Lớn");
        request.setAttribute("listSize", listSize);
        request.getRequestDispatcher("edit-product.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
