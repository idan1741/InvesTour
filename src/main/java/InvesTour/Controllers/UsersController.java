package InvesTour.Controllers;

import InvesTour.Models.User;
import InvesTour.Services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@AllArgsConstructor
public class UsersController {
    private final UsersService usersService;
    @GetMapping(value = "/{id}")
    public void getUserById(@PathVariable("id") Long id) {

    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable("id") Long id) {

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody User user) {

    }

    @PostMapping(value = "/login")
    public void login(@RequestBody String email, @RequestBody String password) {

    }


}
