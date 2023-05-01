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
    private final long price;
    @JsonProperty("change")
    private final int change;
    @JsonProperty("key_word")
    private final String keyWord;
}
