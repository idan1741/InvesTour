package InvesTour.Exceptions;

import java.util.List;

public class ArticlesNotFoundException extends RuntimeException {
    public ArticlesNotFoundException(List<String> stocks) {
        super(String.format("Articles not found for stocks: %s", String.join(", ", stocks)));
    }
}
