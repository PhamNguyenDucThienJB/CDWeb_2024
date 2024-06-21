package vn.edu.hcmuaf.fit.shoe.controllers;


import org.springframework.beans.factory.annotation.Value;
import vn.edu.hcmuaf.fit.shoe.entity.Product;
import vn.edu.hcmuaf.fit.shoe.dto.ResponseObject;
import vn.edu.hcmuaf.fit.shoe.dto.ShopProduct;
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
    ProductService productService;

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
            @RequestParam("thumbnail") MultipartFile thumbnail) {

        // Tạo đối tượng Product và xử lý file thumbnail
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStatus(status);

        // Xử lý tệp tin thumbnail (lưu trữ, lấy đường dẫn, v.v.)
        // Ví dụ: Lưu tệp tin vào hệ thống tệp và lấy đường dẫn
        String thumbnailPath = saveFile(thumbnail);
        product.setThumbnail(thumbnailPath);

        productService.saveProduct(product);
        return ResponseEntity.ok().body(new ResponseObject("Product added successfully", product));
    }
    @Value("${file.upload-dir}")
    private String uploadDir;

    private String saveFile(MultipartFile file) {
        // Đảm bảo thư mục tồn tại
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Đường dẫn tệp
        String filePath = uploadDir + File.separator + file.getOriginalFilename();

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
        productService.saveProduct(existingProduct);
        return ResponseEntity.ok().body(existingProduct);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/searchAutoComplete" , method = RequestMethod.GET)
    public ResponseEntity<ResponseObject> findNameProduct(@RequestParam("value") String value){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke" ,productService.findProductNameContaining(value) ));

    }
    @RequestMapping(value = "/findProductById" , method = RequestMethod.GET)
    public ResponseEntity<ResponseObject> findProductById(@RequestParam("id") String id){

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke" , productService.findProductById(id)));
    }
    @RequestMapping(value = "/findProductByfilter", method = RequestMethod.POST)
    public ResponseEntity<ResponseObject> findProductByFilter( @RequestBody ShopProduct shopProduct){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("oke" , productService.findProduct(shopProduct))) ;
    }
}
