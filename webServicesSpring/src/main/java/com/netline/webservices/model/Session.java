package com.netline.webservices.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_SESSIONS")
@Entity
public class Session {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL)
    @Schema(title = "Identity", description = "The owner of the session.", example = "admin")
    private List<Identity> identity;

    @Column(name="TOKEN")
    @Schema(title = "Token", description = "The session token.", example = "admin")
    private String token;

}
