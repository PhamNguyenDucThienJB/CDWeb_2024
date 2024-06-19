package vn.edu.hcmuaf.fit.shoe.controllers;


import vn.edu.hcmuaf.fit.shoe.entity.Product;
import vn.edu.hcmuaf.fit.shoe.dto.ResponseObject;
import vn.edu.hcmuaf.fit.shoe.dto.ShopProduct;
import vn.edu.hcmuaf.fit.shoe.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return ResponseEntity.ok().body(product);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product existingProduct = productService.getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
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
