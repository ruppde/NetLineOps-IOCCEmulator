package com.netline.webservices.model.details.leg;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_LEG_HYPERMEDIA")
@Entity
public class HyperMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="URLTOOLTIP")
    private String urlTooltip;

    @Column(name="URLLEGDETAIL")
    private String urlLegDetail;

    @Column(name="URLTOOLTIPLOCALATAIRPORT")
    private String urlTooltipLocalAtAirport;

    @Column(name="URLSTATUSLINE")
    private String urlStatusLine;

    @Column(name="URLSTATUSLINELOCALATAIRPORT")
    private String urlStatusLineLocalAtAirport;

}
