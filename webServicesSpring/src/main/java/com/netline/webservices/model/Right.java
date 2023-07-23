package com.netline.webservices.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_RIGHTS")
@Entity
public class Right {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="APPLICATION")
    @Schema(title = "Application", description = "Application name.", example = "NetLineOps")
    private String application;

    @Column(name="NAME")
    @Schema(title = "Name", description = "Right name.", example = "ACCESS_WEBCLIENT")
    private String name;

    @Column(name="ACTIVE")
    @Schema(title = "Active", description = "Whether or not the right is active.", example = "true")
    private boolean active;

}
