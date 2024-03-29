package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Stock {
    @JsonProperty("id")
    private final Long id;
    @JsonProperty("name")
    private final String name;
    @JsonProperty("symbol")
    private final String symbol;
    @JsonProperty("price")
    private final double price;
    @JsonProperty("change")
    private final double  change;
    @JsonProperty("key_word")
    private final String keyWord;
}
