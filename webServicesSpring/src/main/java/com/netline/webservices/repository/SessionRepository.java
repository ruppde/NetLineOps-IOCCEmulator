package com.netline.webservices.repository;

import com.netline.webservices.model.Session;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
@Transactional
public interface SessionRepository extends JpaRepository<Session, String> {

    Session findSessionByToken(String token);

}