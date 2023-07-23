package com.netline.webservices;

import com.netline.webservices.model.Leg;
import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.model.details.AircraftDetail;
import com.netline.webservices.model.details.LegDetail;
import com.netline.webservices.model.details.aircraft.AircraftContact;
import com.netline.webservices.model.details.aircraft.AircraftEquipment;
import com.netline.webservices.model.details.aircraft.AircraftFuel;
import com.netline.webservices.model.details.aircraft.AircraftWeight;
import com.netline.webservices.model.details.leg.*;
import com.netline.webservices.repository.LegRepository;
import com.netline.webservices.repository.SelectableAircraftRepository;
import com.roxstudio.utils.CUrl;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;


@Component
@Slf4j
public class AIMSProvider implements CommandLineRunner {
    @Autowired
    private SelectableAircraftRepository selectableAircraftRepository;

    @Autowired
    private LegRepository legRepository;

    private Elements extractXMLElement(String xmlString, String nodeTagNameElement) {

        Document document = Jsoup.parse(xmlString, "", Parser.xmlParser());
        document.outputSettings().prettyPrint(false);
        Elements returns = document.getElementsByTag(nodeTagNameElement);

        return returns;
    }

    private String getXMLElementValue(Element element, String key) {
        return Jsoup.parse(extractXMLElement(element.toString(), key).toString()).text();
    }

    private String convertToTs(String strDate) {
        Timestamp ts = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            Date date = sdf.parse(strDate);
            ts = Timestamp.valueOf(sdf.format(date));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ts == null ? null : ts.toString();
    }

    @Override
    public void run(String... args) {
        int legCounter = 0;
        int newAcCounter = 0;
        CUrl curl = new CUrl("https://ecrew.flynas.com/wtouch/WSrosterinfo.exe/soap/iwebrosterinfo")
                .insecure()
                .opt("-L")
                .data("<?xml version=\"1.0\"?><SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\"><SOAP-ENV:Body xmlns:NS1=\"urn:wsRosterInfoIntf-IwebRosterInfo\" SOAP-ENV:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:NS2=\"urn:wsRosterInfoIntf\"><NS1:AIMSFlightScheduleInfo><aFlightScheduleInfoInput href=\"#1\"/><aFlightScheduleInfoOutput href=\"#3\"/><errmsg xsi:type=\"xsd:string\"></errmsg></NS1:AIMSFlightScheduleInfo><NS2:TFlightScheduleInfoInput id=\"1\" xsi:type=\"NS2:TFlightScheduleInfoInput\"><Airport xsi:type=\"xsd:string\">RUH</Airport><FlightNo xsi:type=\"xsd:string\">1</FlightNo><ForDate xsi:type=\"xsd:string\">45131</ForDate><FilesDay xsi:type=\"xsd:string\"></FilesDay><ArrDep xsi:type=\"xsd:unsignedByte\">1</ArrDep><Carrier xsi:type=\"xsd:string\">1</Carrier><LegCd xsi:type=\"xsd:string\"></LegCd><AcType xsi:type=\"xsd:string\"></AcType><AcReg xsi:type=\"xsd:string\"></AcReg><TimesIn xsi:type=\"xsd:unsignedByte\">3</TimesIn><BringHidden xsi:type=\"xsd:boolean\">true</BringHidden><Languages href=\"#2\"/><OptionIdx xsi:type=\"xsd:unsignedByte\">1</OptionIdx><CrewID xsi:type=\"xsd:int\">1000</CrewID></NS2:TFlightScheduleInfoInput><NS2:Languages id=\"2\" xsi:type=\"NS2:TLanguageBuf\"><Code xsi:type=\"xsd:string\"></Code><Desc xsi:type=\"xsd:string\"></Desc><Region xsi:type=\"xsd:short\">16</Region></NS2:Languages><NS2:TFlightScheduleInfoOutPut id=\"3\" xsi:type=\"NS2:TFlightScheduleInfoOutPut\"><isPAxAirline xsi:type=\"xsd:boolean\">false</isPAxAirline><FlightsList xsi:type=\"SOAP-ENC:Array\" SOAP-ENC:arrayType=\"NS2:TFlightScheduleinfo[0]\"/></NS2:TFlightScheduleInfoOutPut></SOAP-ENV:Body></SOAP-ENV:Envelope>");
        String acResp = curl.exec(CUrl.UTF8, null);

        for (Element e : extractXMLElement(acResp, "TFlightScheduleInfo")) {
            String strDate = Jsoup.parse(extractXMLElement(e.toString(), "DDate").toString()).text().substring(0, 10);
            String lAta = strDate + " " + getXMLElementValue(e, "lAta") + ":00";
            String lSta = strDate + " " + getXMLElementValue(e, "lSta") + ":00";
            String lStd = strDate + " " + getXMLElementValue(e, "lStd") + ":00";
            String lAtd = strDate + " " + getXMLElementValue(e, "lAtd") + ":00";


            NatKey natKey = new NatKey();
            natKey.setCounter(Jsoup.parse(extractXMLElement(e.toString(), "LGDATIdx").toString()).text());
            natKey.setFlight(Jsoup.parse(extractXMLElement(e.toString(), "Flight").toString()).text());
            natKey.setDepApSched(Jsoup.parse(extractXMLElement(e.toString(), "StFrom").toString()).text());
            natKey.setDayOfOrigin(convertToTs(lAta));
            LocalTimes localTimes = new LocalTimes();
            localTimes.setArrivalActual(convertToTs(lAta));
            localTimes.setArrivalSched(convertToTs(lSta));
            localTimes.setDepartureSched(convertToTs(lStd));
            localTimes.setDepartureActual(convertToTs(lAtd));
            RotationIdentifier rotationIdentifier = new RotationIdentifier();
            rotationIdentifier.setRegistration(Jsoup.parse(extractXMLElement(e.toString(), "AcReg").toString()).text());
            Schedule schedule = new Schedule();
            schedule.setAircraftOwner("XY");
            schedule.setAircraftSubtype(Jsoup.parse(extractXMLElement(e.toString(), "sAcType").toString()).text());
            schedule.setAircraftConfiguration("configuration");
            schedule.setEmployerCabin("CREWLINK IRELAND LTD.");
            schedule.setEmployerCockpit("Storm McGinley Aviation Group");
            schedule.setArrival(convertToTs(lSta));
            schedule.setDeparture(convertToTs(lStd));
            schedule.setLdoOffset("0");
            schedule.setArrivalAirport(Jsoup.parse(extractXMLElement(e.toString(), "StTo").toString()).text());
            schedule.setDepartureAirport(Jsoup.parse(extractXMLElement(e.toString(), "StFrom").toString()).text());
            schedule.setRotationIdentifier(rotationIdentifier);
            Actuals actuals = new Actuals();
            actuals.setOnblockTime(convertToTs(lSta));
            actuals.setOffblockTime(convertToTs(lStd));
            LegDetail legDetail = new LegDetail();
            legDetail.setState("ISK");
            legDetail.setServiceType("PAX");
            legDetail.setSchedule(schedule);
            legDetail.setActuals(actuals);
            Leg newLeg = new Leg();
            newLeg.setIdentifier(natKey);
            newLeg.setLocalTimes(localTimes);
            newLeg.setLegType("LEG");
            newLeg.setEventType("ACTUAL");
            newLeg.setLegDetail(legDetail);
            newLeg.setActualArrivalAirport(Jsoup.parse(extractXMLElement(e.toString(), "StTo").toString()).text());
            newLeg.setActualDepartureAirport(Jsoup.parse(extractXMLElement(e.toString(), "StFrom").toString()).text());
            newLeg.setName(Jsoup.parse(extractXMLElement(e.toString(), "Flight").toString()).text());
            newLeg.setArrTimeLocalAtAirport(convertToTs(lSta));
            newLeg.setDepTimeLocalAtAirport(convertToTs(lStd));

            legRepository.save(newLeg);
            legCounter++;

            if (selectableAircraftRepository.findSelectableAircraftByRegistration(Jsoup.parse(extractXMLElement(e.toString(), "AcReg").toString()).text()) == null) {
                SelectableAircraft newAircraft = new SelectableAircraft();
                newAircraft.setRegistration(Jsoup.parse(extractXMLElement(e.toString(), "AcReg").toString()).text());
                newAircraft.setOwner("XY");
                newAircraft.setOwnerName("FLYNAS");
                newAircraft.setSubtype(Jsoup.parse(extractXMLElement(e.toString(), "AcType").toString()).text());
                newAircraft.setSubtypeName(Jsoup.parse(extractXMLElement(e.toString(), "sAcType").toString()).text());
                newAircraft.setState("PHYSICAL");
                newAircraft.setSelected(true);
                AircraftDetail aircraftDetails = new AircraftDetail();
                AircraftContact aircraftContact = new AircraftContact();
                aircraftContact.setAcars("ACARS");
                aircraftContact.setRadio("1045.31");
                aircraftContact.setCallSign("XY" + Math.floor(Math.random()*(938 - 20 + 1) + 20));
                aircraftContact.setPhone("3456384476");
                aircraftDetails.setAcContact(aircraftContact);
                AircraftWeight aircraftWeight = new AircraftWeight();
                aircraftWeight.setCargoCapacity(Long.valueOf(46455));
                aircraftWeight.setDryOperatingWeight(Long.valueOf(55735));
                aircraftWeight.setMaxTakeoffWeight(Long.valueOf(555755));
                aircraftDetails.setAcWeight(aircraftWeight);
                AircraftFuel aircraftFuel = new AircraftFuel();
                aircraftFuel.setFuelCapacity(Long.valueOf(221455));
                aircraftFuel.setAverageFuelConsumption(Long.valueOf(8629));
                aircraftDetails.setAcFuel(aircraftFuel);
                AircraftEquipment aircraftEquipment = new AircraftEquipment();
                aircraftEquipment.setCabinCrewSize(4);
                aircraftEquipment.setCockpitCrewSize(2);
                aircraftEquipment.setSpecialEquipment("special");
                aircraftEquipment.setApRestriction(true);
                aircraftEquipment.setCompartments("compartments");
                aircraftEquipment.setNoiseFactor(true);
                aircraftEquipment.setVersionName("versionName");
                aircraftEquipment.setStandardVersion("standardVersion");
                aircraftDetails.setAcEquipment(aircraftEquipment);
                newAircraft.setAircraftDetails(aircraftDetails);
                selectableAircraftRepository.save(newAircraft);

                newAcCounter++;
            }
        }
        log.info("Loaded " + legCounter + " legs (" + newAcCounter + " new aircrafts) from AIMS provider.");
    }
}