package InvesTour.Controllers;

import InvesTour.Models.User;
import InvesTour.Services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public Map<String, String> addUser(@RequestBody User user) throws Exception {
        return usersService.signUp(user);
    }

    @PostMapping(value = "/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        return usersService.login(credentials.get("email"), credentials.get("password"));
    }
}
