package com.netline.webservices.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_NAMEDSELECTIONS")
@Entity
public class NamedSelection {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="SELECTIONID")
    @Schema(title = "SelectionID", description = "The name of the selection.", example = "PROD")
    private String selectionID;

    @Column(name="BEGINDATE")
    @Schema(title = "BeginDate", description = "Date the selection starts from.", example = "00000")
    private Date beginDate;

    @Column(name="NUMBEROFDAYS")
    @Schema(title = "NumberOfDays", description = "The amount of days the selection lasts for.", example = "7")
    private int numberOfDays;

    @OneToMany(cascade = CascadeType.ALL)
    private List<SelectableAircraft> aircraftSelections;

}

