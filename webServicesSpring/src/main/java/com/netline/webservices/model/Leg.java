package com.netline.webservices.model;

import com.netline.webservices.model.details.LegDetail;
import com.netline.webservices.model.details.leg.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_LEGS")
@Entity
public class Leg {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private NatKey identifier;

    @OneToOne(cascade = {CascadeType.ALL})
    private LocalTimes localTimes;

    @Column(name="LEGTYPE")
    private String legType;

    @Column(name="EVENTTYPE")
    private String eventType;

    @OneToOne(cascade = {CascadeType.ALL})
    private LegDetail legDetail;

 //   layoutSchedule

   //         layoutActual

 //   userMarkers

  //                  systemMarkers

  //  remarks
  @OneToOne(cascade = {CascadeType.ALL})
    private HyperMedia hyperMedia;

    @Column(name="CALLSIGN")
    private String callSign;

    @Column(name="DEPTIMELOCALATAIRPORT")
    private String depTimeLocalAtAirport;

    @Column(name="BESTDEPTIME")
    private String bestDepTime;

    @Column(name="ARRTIMELOCALATAIRPORT")
    private String arrTimeLocalAtAirport;

    @Column(name="BESTARRTIME")
    private String bestArrTime;

    @Column(name="PROBLEM")
    private String problem;

    @Column(name="NAME")
    private String name;

    @Column(name="OPERATINGCARRIER")
    private String operatingCarrier;

    @Column(name="COMMERCIALCARRIER")
    private String commercialCarrier;

    @Column(name="DISPATCHOFFICE")
    private String dispatchOffice;

    @Column(name="JOINTOPERATOR")
    private String jointOperator;

    @Column(name="ACTUALDEPARTUREAIRPORT")
    private String actualDepartureAirport;

    @Column(name="ACTUALARRIVALAIRPORT")
    private String actualArrivalAirport;

    @Column(name="UPDATEKEY")
    private String updateKey;

}
