package InvesTour.Models;

import lombok.Data;

@Data
public class User {
    private final String email;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String role;
}
