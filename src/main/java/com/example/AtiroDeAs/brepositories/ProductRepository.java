package com.example.AtiroDeAs.brepositories;

import com.example.AtiroDeAs.amodels.Product;
import com.example.AtiroDeAs.brepositories.Cruds.ProductCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepository {
    @Autowired
    private ProductCRUDRepository productCRUDRepository;

    public List<Product> getAll(){
        return productCRUDRepository.findAll();
    }

    public Optional<Product> getOneProduct(String id){
        return productCRUDRepository.findById(id);
    }

    public Product save(Product product){
        return productCRUDRepository.save(product);
    }

    public void delete(String id){
        productCRUDRepository.deleteById(id);
    }

    public void deleteAll(){
        productCRUDRepository.deleteAll();
    }

    public boolean existsById(String id){
        return productCRUDRepository.existsById(id);
    }

    public Optional<List<Product>> filterByCategory(String category){
        return productCRUDRepository.findAllByCategory(category);
    }

    public Optional<List<Product>> filterByName(String name){
        return productCRUDRepository.findAllByName(name);
    }

    public Optional<List<Product>> filterByLowerPrice(double price){
        return productCRUDRepository.filterByLowerPrice(price);
    }

    public List<Product> filterByAvailability(){
        return productCRUDRepository.filterByAvailability();
    }

    public void saveAll(List products){
        productCRUDRepository.saveAll(products);
    }
}
