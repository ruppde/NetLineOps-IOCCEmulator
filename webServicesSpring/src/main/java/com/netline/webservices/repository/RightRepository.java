package com.netline.webservices.repository;

import com.netline.webservices.model.Right;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface RightRepository extends JpaRepository<Right, String> {

    List<Right> findAllByOrderByIdDesc();

    Right findById(int id);

}