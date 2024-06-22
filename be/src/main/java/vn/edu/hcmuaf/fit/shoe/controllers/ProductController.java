package vn.edu.hcmuaf.fit.shoe.controllers;


import org.springframework.beans.factory.annotation.Value;
import vn.edu.hcmuaf.fit.shoe.entity.Branch;
import vn.edu.hcmuaf.fit.shoe.entity.Product;
import vn.edu.hcmuaf.fit.shoe.dto.ResponseObject;
import vn.edu.hcmuaf.fit.shoe.dto.ShopProduct;
import vn.edu.hcmuaf.fit.shoe.services.BranchService;
import vn.edu.hcmuaf.fit.shoe.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {
    @Autowired
    BranchService  branchService;
    @Autowired
    ProductService productService;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/allProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/product/add")
    public ResponseEntity<ResponseObject> addProduct(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("status") String status,
            @RequestParam("description") String description,
            @RequestParam("branch_id") int branch_id,
            @RequestParam("quantity") int quantity,
            @RequestParam("priceSale") int priceSale,
            @RequestParam("thumbnail") MultipartFile thumbnail) {

        // Tìm đối tượng Branch từ cơ sở dữ liệu
        Branch branch = branchService.findById(branch_id);
        if (branch == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("Branch not found", null));
        }

        // Tạo đối tượng Product và gán Branch
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        product.setBranch(branch); // Gán đối tượng Branch từ cơ sở dữ liệu vào Product
        product.setStatus(status);
        product.setQuantity(quantity);
        product.setPriceSale(priceSale);

        // Xử lý tệp tin thumbnail (lưu trữ, lấy đường dẫn, v.v.)
        String thumbnailPath = saveFile(thumbnail);
        product.setThumbnail(thumbnailPath);

        // Lưu đối tượng Product
        productService.saveProduct(product);
        return ResponseEntity.ok().body(new ResponseObject("Product added successfully", product));
    }


    private String sanitizeFilename(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
    }
    private String saveFile(MultipartFile file) {
        // Đảm bảo thư mục tải lên tồn tại
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Làm sạch tên tệp
        String sanitizedFilename = sanitizeFilename(file.getOriginalFilename());

        // Đường dẫn tệp
        String filePath = uploadDir + File.separator + sanitizedFilename;

        // Lưu tệp
        try {
            file.transferTo(new File(filePath));
            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product existingProduct = productService.getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setThumbnail(product.getThumbnail());
        existingProduct.setStatus(product.getStatus());
        existingProduct.setPriceSale(product.getPriceSale());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBranch(product.getBranch());
        existingProduct.setQuantity(product.getQuantity());
        productService.saveProduct(existingProduct);
        return ResponseEntity.ok().body(existingProduct);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }




    @RequestMapping(value = "/searchAutoComplete", method = RequestMethod.GET)
    public ResponseEntity<ResponseObject> findNameProduct(@RequestParam("value") String value) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke", productService.findProductNameContaining(value)));

    }

    @RequestMapping(value = "/findProductById", method = RequestMethod.GET)
    public ResponseEntity<ResponseObject> findProductById(@RequestParam("id") String id) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke", productService.findProductById(id)));
    }

    @RequestMapping(value = "/findProductByfilter", method = RequestMethod.POST)
    public ResponseEntity<ResponseObject> findProductByFilter(@RequestBody ShopProduct shopProduct) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke", productService.findProduct(shopProduct)));
    }
}
