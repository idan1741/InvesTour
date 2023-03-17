package InvesTour.Models;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class News {
    private Long id;
    private Website website;
    private Stock stock;
    private String url;
    private Timestamp timestamp;
}
