package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Article {
    @JsonProperty("newUrl")
    private final String newUrl;
    @JsonProperty("imageUrl")
    private final String imageUrl;
    @JsonProperty("title")
    private final String title;
    @JsonProperty("description")
    private final String description;
    @JsonProperty("publishedAt")
    private final String publishedAt;

    public static Article fromJson(JsonNode externalJson) {
        String newUrlField = "url";
        String urlToImageField = "urlToImage";
        String titleField = "title";
        String descriptionField = "description";
        String publishedAtField = "publishedAt";

        return new Article(
                externalJson.has(newUrlField) ? externalJson.get(newUrlField).asText() : "",
                externalJson.has(urlToImageField) ? externalJson.get(urlToImageField).asText() : "",
                externalJson.has(titleField) ? externalJson.get(titleField).asText() : "",
                externalJson.has(descriptionField) ? externalJson.get(descriptionField).asText() : "",
                externalJson.has(publishedAtField) ? externalJson.get(publishedAtField).asText() : ""
        );
    }
}
