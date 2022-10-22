package com.example.AtiroDeAs.dcontrollers;

import com.example.AtiroDeAs.amodels.Product;
import com.example.AtiroDeAs.cservices.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ATDA/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainEvery")
    public List<Product> getAll(){
        return productService.getAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainOne/{id}")
    public Optional<Product> getOne(@PathVariable("id") String id){
        return productService.getOneProduct(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public Product save (@RequestBody Product product){
        return productService.save(product);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/update")
    public Product overwrite(@RequestBody Product product){
        return productService.update(product);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id){
        productService.delete(id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        productService.deleteAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainCategory/{category}")
    public ResponseEntity<?> getCategory(@PathVariable("category") String category){
        return productService.filterByCategory(category);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainName/{name}")
    public ResponseEntity<?> getName(@PathVariable("name") String name){
        return productService.filterByName(name);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainPrice/{price}")
    public ResponseEntity<?> getPrice(@PathVariable("price") double price){
        return productService.filterByLowerPrice(price);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/obtainAvailability")
    public List<Product> getAvailability(){
        return productService.filterByAvailability();
    }
}
