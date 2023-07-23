package com.netline.webservices.model.details;

import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.model.details.aircraft.AircraftContact;
import com.netline.webservices.model.details.aircraft.AircraftEquipment;
import com.netline.webservices.model.details.aircraft.AircraftFuel;
import com.netline.webservices.model.details.aircraft.AircraftWeight;
import com.netline.webservices.model.details.leg.Actuals;
import com.netline.webservices.model.details.leg.Schedule;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_LEG")
@Entity
public class LegDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private Schedule schedule;

    @Column(name="STATE")
    private String state;

    @Column(name="SERVICETYPE")
    private String serviceType;

    @OneToOne(cascade = {CascadeType.ALL})
    private Actuals actuals;


}
