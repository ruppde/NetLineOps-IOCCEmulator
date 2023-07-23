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
@Table(name = "NTLN_IDENTITIES")
@Entity
public class Identity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="USERNAME")
    @Schema(title = "Username", description = "The user name.", example = "admin")
    private String username;

    @Column(name="PASSWORD")
    @Schema(title = "Password", description = "The user password.", example = "R00TAdministrator123!")
    private String password;

    @OneToMany
    private List<Right> aggregatedRights;

}
