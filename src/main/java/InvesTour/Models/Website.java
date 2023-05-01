package InvesTour.Models;

import lombok.Data;

@Data
public class Website {
    private final Long id;
    private final String name;
    private final String url;
    private final String username;
    private final String password;
}
