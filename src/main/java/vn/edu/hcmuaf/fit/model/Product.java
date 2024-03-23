package vn.edu.hcmuaf.fit.model;

import java.text.DecimalFormat;
import java.util.List;

public class Product {
    String id;
    String name;
    String loaiBanh;
    String kichThuoc;
    int khoiLuong;
    String moTa;
    String noiDung;
    List<String> listImg;
    int price;
    List<Comment> comments;
    ProductDetails details;



    public Product(String id, String name, String loaiBanh, String kichThuoc, int khoiLuong, String moTa, String noiDung, List<String> listImg, int price, List<Comment> comments,  ProductDetails details) {
        this.id = id;
        this.name = name;
        this.loaiBanh = loaiBanh;
        this.kichThuoc= kichThuoc;
        this.khoiLuong = khoiLuong;
        this.moTa = moTa;
        this.noiDung=noiDung;
        this.listImg = listImg;
        this.price = price;
        this.comments = comments;
        this.details =details;
    }
    public Product(String id, String name, String loaiBanh, String kichThuoc, int khoiLuong, String moTa, String noiDung, List<String> listImg, int price){
        this.id=id;
        this.name = name;
        this.loaiBanh = loaiBanh;
        this.kichThuoc= kichThuoc;
        this.khoiLuong = khoiLuong;
        this.moTa = moTa;
        this.noiDung=noiDung;
        this.listImg = listImg;
        this.price = price;
    }

    public void setLoaiBanh(String loaiBanh) {
        this.loaiBanh = loaiBanh;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getListImg() {
        return listImg;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getKhoiLuong() {
        return khoiLuong;
    }


    public String getLoaiBanh() {
        return loaiBanh;
    }

    public String getKichThuoc() {
        return kichThuoc;
    }

    public void setKichThuoc(String kichThuoc) {
        this.kichThuoc = kichThuoc;
    }

    public String getMoTa() {
        return moTa;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public ProductDetails getDetail() {
        return details;
    }

    public void setListpd(ProductDetails details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", loaiBanh='" + loaiBanh + '\'' +
                ", kichThuoc='" + kichThuoc + '\'' +
                ", khoiLuong='" + khoiLuong + '\'' +
                ", moTa='" + moTa + '\'' +
                ", noiDung='" + noiDung + '\'' +
                ", listImg=" + listImg +
                ", price=" + price +
                ", comments=" + comments +
                '}';
    }

    public String getStatus(){
        if(getDetail().getInventory()>1){
            return "Còn hàng";
        }
        else{
            return "Hết hàng";
        }
    }
    public boolean isExistNumber(int slg){
        if(getDetail().getInventory() > slg) return true;
            return false;
    }

    public static String formatNum(int price){
        DecimalFormat df = new DecimalFormat("###,###,###");
        return df.format(price);

    }
    public static void main(String[] args) {

        System.out.println(formatNum(1234567));
    }
}