package InvesTour.Controllers;

import InvesTour.Exceptions.ArticlesNotFoundException;
import InvesTour.Models.Article;
import InvesTour.Services.NewsService;
import InvesTour.Services.WebsiteService;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/news")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class NewsController {
    private final NewsService newsService;
    private final WebsiteService websiteService;

    @GetMapping(value = "/articles")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<String> hotStocks = List.of("\"apple\"", "\"tesla\"", "\"microsoft\"", "\"amazon\"");

        return ResponseEntity.ok().body(newsService.getHotStocksArticles(hotStocks)
                .orElseThrow(() -> new ArticlesNotFoundException(hotStocks)));
    }

    @GetMapping(value = "/websites")
    public ResponseEntity<JsonNode> getAllWebsites() {
        return ResponseEntity.ok().body(newsService.getAvailableWebSite());
    }

    @GetMapping(value = "/websites/user/{userEmail}")
    public ResponseEntity<List<String>> getAllWebsitesByUserEmail(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(websiteService.getAllWebsitesByUserEmail(userEmail));
    }

    @GetMapping(value = "/articles/user/{userEmail}")
    public ResponseEntity<List<Article>> getArticlesByUser(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(this.newsService.getStocksArticlesByUser(userEmail)
                .orElseThrow(() -> new ArticlesNotFoundException(List.of())));
    }

    @GetMapping(value = "/articles/user/websites/{userEmail}")
    public ResponseEntity<List<Article>> getArticlesByUserAndWebsites(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(this.newsService.getStocksArticlesByUserAndWebsites(userEmail)
                .orElseThrow(() -> new ArticlesNotFoundException(List.of())));
    }

    @GetMapping(value = "/articles/{symbol}")
    public ResponseEntity<List<Article>> getNewsByStock(@PathVariable("symbol") String stockSymbol) {
        return ResponseEntity.ok().body(this.newsService.getNewsByStock(stockSymbol)
                .orElseThrow(() -> new ArticlesNotFoundException(List.of())));
    }

    @GetMapping(value = "/user/{userId}/stock/{stockName}")
    public void getArticlesByUserAndStock(@PathVariable("userId") Long id, @PathVariable("stockName") String stockName) {

    }

    @PostMapping("/user/add")
    public ResponseEntity<String> addWebsiteToUser(@RequestBody JsonNode jsonBody) {
        String userEmail = jsonBody.get("userEmail").asText();
        String websiteId = jsonBody.get("websiteId").asText();

        this.websiteService.addWebsiteToUser(userEmail, websiteId);

        ObjectNode userWebsiteInfo = Json.newObject()
                .put("UserEmail", userEmail)
                .put("WebsiteID", websiteId);

        return ResponseEntity.ok(userWebsiteInfo.toString());
    }

    @PostMapping(value = "/user/delete")
    public ResponseEntity<String> deleteWebsiteFromUser(@RequestBody JsonNode jsonBody) {
        String userEmail = jsonBody.get("userEmail").asText();
        String websiteId = jsonBody.get("websiteId").asText();

        this.websiteService.deleteWebsiteFromUser(userEmail, websiteId);

        ObjectNode userWebsiteInfo = Json.newObject()
                .put("UserEmail", userEmail)
                .put("WebsiteID", websiteId);

        return ResponseEntity.ok(userWebsiteInfo.toString());
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
