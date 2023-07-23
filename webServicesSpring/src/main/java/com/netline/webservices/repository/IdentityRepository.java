package com.netline.webservices.repository;

import com.netline.webservices.model.Identity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
    public interface IdentityRepository extends JpaRepository<Identity, String> {

    List<Identity> findAllByOrderByIdDesc();

    Identity findIdentityByUsernameAndPassword(String username, String password);

    Identity findById(int id);

}