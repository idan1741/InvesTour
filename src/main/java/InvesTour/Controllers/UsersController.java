package InvesTour.Controllers;

import InvesTour.Models.User;
import InvesTour.Services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UsersController {
    private final UsersService usersService;
    @GetMapping(value = "/{id}")
    public void getUserById(@PathVariable("id") String email) {
        int x = 1;
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable("id") String email) {

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody User user) throws Exception {
        usersService.signUp(user);
    }

    @PostMapping(value = "/login")
    public boolean login(@RequestBody Map<String, String> credentials) throws IOException {
        return usersService.login(credentials.get("email"), credentials.get("password"));
    }


}
