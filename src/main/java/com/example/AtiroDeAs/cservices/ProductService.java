package com.example.AtiroDeAs.cservices;

import com.example.AtiroDeAs.amodels.Product;
import com.example.AtiroDeAs.brepositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll(){
        return productRepository.getAll();
    }

    public Optional<Product> getOneProduct(String id){
        return productRepository.getOneProduct(id);
    }

    public Product save(Product product){
        return productRepository.save(product);
    }

    public void delete(String id){
        productRepository.delete(id);
    }

    public void deleteAll(){
        productRepository.deleteAll();
    }

    public Product update(Product product){
        if(productRepository.existsById(product.getId())){
            return productRepository.save(product);
        }else {
            return null;
        }
    }

    public ResponseEntity<?> filterByCategory(String category){
        Optional<List<Product>> productos = productRepository.filterByCategory(category);
        return productos.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> filterByName(String name){
        Optional<List<Product>> productos = productRepository.filterByName(name);
        return productos.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> filterByLowerPrice(double price){
        Optional<List<Product>> productos = productRepository.filterByLowerPrice(price);
        return productos.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public List<Product> filterByAvailability(){
        return productRepository.filterByAvailability();
    }
}
