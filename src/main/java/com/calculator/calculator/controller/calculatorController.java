package com.calculator.calculator.controller;

import com.calculator.calculator.exeptions.NotFoundExeption;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("counter")
public class calculatorController {

    private List<Map<String, String>> counters = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String , String>() {{ put("name", "counter1"); put("value", "8"); }} );
        add(new HashMap<String , String>() {{ put("name", "counter2"); put("value", "8"); }} );
        add(new HashMap<String , String>() {{ put("name", "counter3"); put("value", "8"); }} );
    }};

    @GetMapping
    public List<Map<String, String>> counter() {
        return counters;
    }

    @GetMapping("{name}")
    public Map<String, String> getCounter(@PathVariable String name) {
        return getCounterByName(name);
    }

    @PostMapping
    public Map<String, String> create(@RequestBody Map<String, String> counter) {

        String nameCounter = counter.get("name");

        if (!nameCounter.equals("") && nameCounter != null) {
            counter.put("name", nameCounter);
            counters.add(counter);
        }

        return counter;
    }

    @PutMapping("{name}")
    public Map<String, String> update(@PathVariable String name, @RequestBody Map<String, String> counter) {
        Map<String, String> counterFromMemory = getCounterByName(name);

        counterFromMemory.putAll(counter);
        counterFromMemory.put("name", name);

        return counterFromMemory;
    }

    @DeleteMapping("{name}")
    public void delete(@PathVariable String name) {

        Map<String, String> counter = getCounterByName(name);

        counters.remove(counter);
    }

    private Map<String, String> getCounterByName(@PathVariable String name) {
        return counters.stream().filter(counter -> counter.get("name")
            .equals(name))
            .findFirst()
                .orElseThrow(NotFoundExeption::new);
    }

}
