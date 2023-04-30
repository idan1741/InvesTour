package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class User {
    @JsonProperty("first_name")
    private final String firstName;
    @JsonProperty("last_name")
    private final String lastName;
    @JsonProperty("email")
    private final String email;
    @JsonProperty("password")
    private final String password;
    @JsonProperty("role")
    private final String role;
    
}
