package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StockPriceData {
    @JsonProperty("isRiseUp")
    private Boolean isRiseUp;
    @JsonProperty("name")
    private String symbol;
    @JsonProperty("change")
    private double change;
    @JsonProperty("series")
    private List<StockPricePerTime> prices;
    @JsonIgnore
    private String interval;

    @JsonIgnore
    private final int NUMBER_OF_POINTS = 25;
    @JsonIgnore
    private static final ZoneId ZONE_ID = ZoneId.of("Asia/Jerusalem");
    @JsonIgnore
    private final String regex = "\\s\\d{2}:\\d{2}:\\d{2}$";

    public StockPriceData(JsonNode jsonNode, String timeInterval) {
        this.symbol = jsonNode.path("Meta Data").path("2. Symbol").asText();
        if(!timeInterval.equals("year")) {
            this.interval = jsonNode.path("Meta Data").path("4. Interval").asText();
        } else {
            this.interval = "-1";
        }
        this.prices = this.deserializePrices(jsonNode.path(this.getJsonPathToPrices(timeInterval, this.interval)), timeInterval);
        this.change = this.calcChange();
        this.isRiseUp = this.change > 0;
    }

    private List<StockPricePerTime> deserializePrices(JsonNode jsonNode, String timeInterval) {
        List<StockPricePerTime> prices = new ArrayList<>();
        Iterator<String> stringIterator = jsonNode.fieldNames();

        List<String> listOfDates = new ArrayList<>();
        String date = this.getNextDate(timeInterval,stringIterator);
        LocalDateTime time = getDateToTakeDataFrom(timeInterval, date);
        while (stringIterator.hasNext()) {
            LocalDateTime timeToCalc = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            if(timeToCalc.isAfter(time)){
                listOfDates.add(date);
            }
            date = this.getNextDate(timeInterval,stringIterator);
        }
        int n = listOfDates.size() / NUMBER_OF_POINTS + 1;

        for (int i = 0; i < listOfDates.size(); i++) {
            if (i % n == 0) {
                String dateToAdd = listOfDates.get(i);
                String outputDate;
                if(timeInterval.equals("year")) {
                    outputDate = dateToAdd.replaceAll(regex, "");
                } else {
                    outputDate = dateToAdd;
                }
                prices.add(new StockPricePerTime(dateToAdd, jsonNode.path(outputDate)));
            }
        }

        return prices;
    }

    private String getNextDate(String timeInterval, Iterator<String> stringIterator) {
        if(timeInterval.equals("year")){
            return stringIterator.next() + " 23:00:00";
        }
        return stringIterator.next();
    }
    private double calcChange() {
        double oldClosePrice = this.prices.get(0).getPrice();
        double newClosePrice = this.prices.get(prices.size() - 1).getPrice();

        return calculatePercentageChange(oldClosePrice, newClosePrice);
    }

    private double calculatePercentageChange(double oldValue, double newValue) {
        double change = newValue - oldValue;
        return (change / oldValue) * 100.0;
    }

    private LocalDateTime getDateToTakeDataFrom(String timeInterval, String date){
        LocalDateTime dateTime = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return switch (timeInterval) {
            case "day" -> dateTime.minusHours(24);
            case "week" -> dateTime.minusDays(7);
            case "month" -> dateTime.minusDays(31);
            default -> dateTime.minusYears(30);
        };
    }

    private String getJsonPathToPrices(String timeInterval, String interval){
        return switch (interval){
            case "-1" -> "Weekly Time Series";
            default -> "Time Series (" + interval + ")";
        };
    }
}
