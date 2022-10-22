package com.example.AtiroDeAs.brepositories.Cruds;

import com.example.AtiroDeAs.amodels.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductCRUDRepository extends MongoRepository <Product, String> {
    public Optional<List<Product>> findAllByCategory(String category);

    @Query("{'name':  {$regex: /?0/i}}")
    public Optional<List<Product>> findAllByName(String name);

    @Query("{price:  {$lte:  ?0}}")
    public Optional<List<Product>> filterByLowerPrice(double price);

    @Query("{availability: true}")
    public List<Product> filterByAvailability();
}
