package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class StockPricePerTime {
    @JsonProperty("time")
    LocalDateTime time;
    @JsonProperty("open")
    double open;
    @JsonProperty("high")
    double high;
    @JsonProperty("low")
    double low;
    @JsonProperty("close")
    double close;
    @JsonProperty("volume")
    double volume;

    public StockPricePerTime(String date, JsonNode jsonNode) {
        this.time = this.makeDate(date);
        this.open = jsonNode.path("1. open").asDouble();
        this.high = jsonNode.path("2. high").asDouble();
        this.low = jsonNode.path("3. low").asDouble();
        this.close = jsonNode.path("4. close").asDouble();
        this.volume = jsonNode.path("5. volume").asDouble();
    }

    public LocalDateTime makeDate(String date){
        //LocalDateTime now = LocalDateTime.now();

        LocalDateTime localDateTime = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return localDateTime;
        // TODO: 13/05/2023 maybe we need to move to jerusalem time zone
//        localDateTime = localDateTime.plusHours(now.getHour() + 4);
//        localDateTime = localDateTime.plusMinutes(now.getMinute());
//        localDateTime = localDateTime.plusSeconds(now.getSecond());
//        return localDateTime;
    }
}
