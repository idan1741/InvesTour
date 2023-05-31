package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Website {
    @JsonProperty("website_id")
    private final String websiteId ;
    @JsonProperty("website_name")
    private final String websiteName ;
}

