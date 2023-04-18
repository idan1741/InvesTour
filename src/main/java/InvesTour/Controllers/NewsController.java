package InvesTour.Controllers;

import InvesTour.Exceptions.ArticlesNotFoundException;
import InvesTour.Models.Article;
import InvesTour.Services.NewsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/news")
@AllArgsConstructor
public class NewsController {
    private final NewsService service;

    @GetMapping(value = "/articles")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<String> hotStocks = List.of("\"apple\"", "\"tesla\"", "\"microsoft\"", "\"amazon\"");

        return ResponseEntity.ok().body(service.getHotStocksArticles(hotStocks)
                .orElseThrow(() -> new ArticlesNotFoundException(hotStocks)));
    }

    @GetMapping(value = "/websites")
    public void getAllWebsites() {

    }

    @GetMapping(value = "/articles/user/{userEmail}")
    public ResponseEntity<List<Article>> getArticlesByUser(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(this.service.getStocksArticlesByUser(userEmail)
                .orElseThrow(() -> new ArticlesNotFoundException(List.of())));
    }

    @GetMapping(value = "/websites/user/{userId}")
    public void getWebsitesByUser(@PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/user/{userId}/stock/{stockName}")
    public void getArticlesByUserAndStock(@PathVariable("userId") Long id, @PathVariable("stockName") String stockName) {

    }

    @ExceptionHandler(ArticlesNotFoundException.class)
    public ResponseEntity<String> errorHandler(ArticlesNotFoundException e) {
        return ResponseEntity.badRequest()
                .body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> errorHandler(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Unknown error has occurred");
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> errorHandler(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }
}
