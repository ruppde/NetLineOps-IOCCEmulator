package com.netline.webservices.model.details.leg;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_LEG_ACTUALS")
@Entity
public class Actuals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="ONBLOCKTIME")
    private String onblockTime;

    @Column(name="OFFBLOCKTIME")
    private String offblockTime;

}
