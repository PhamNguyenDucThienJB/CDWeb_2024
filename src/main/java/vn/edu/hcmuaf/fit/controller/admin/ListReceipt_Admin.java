package vn.edu.hcmuaf.fit.controller.admin;

import vn.edu.hcmuaf.fit.model.Receipt;
import vn.edu.hcmuaf.fit.service.ReceiptService;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ListReceipt_Admin", value = "/admin/ListReceipt_Admin")
public class ListReceipt_Admin extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Receipt> lr = ReceiptService.getData();
        request.setAttribute("listreceipt", lr);

        String doanhthuthangnay = Receipt.formatNum(ReceiptService.getDoanhThuThisMonth());
        request.setAttribute("doanhthuthangnay", doanhthuthangnay);

        String doanhthuhomnay = Receipt.formatNum(ReceiptService.getDoanhThuToDay());
        request.setAttribute("doanhthuhomnay", doanhthuhomnay);

        int solgSPbandcthangnay = ReceiptService.getNumberProThisMonth();
        request.setAttribute("solgSPbandcthangnay", solgSPbandcthangnay);

        int soDHhomnay = ReceiptService.getAllReceiptToDay().size();
        request.setAttribute("soDHhomnay", soDHhomnay);

        request.getRequestDispatcher("admin-web.jsp").forward(request,response);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
