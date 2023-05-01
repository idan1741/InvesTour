package InvesTour.Models;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class News {
    private final Long id;
    private final Website website;
    private final Stock stock;
    private final String url;
    private final Timestamp timestamp;
}
