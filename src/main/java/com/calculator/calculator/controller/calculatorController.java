package com.calculator.calculator.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("counter")
public class calculatorController {

    public List<Map<String, String>> counters = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String , String>() {{ put("name", "counter1"); put("value", "1"); }} );
        add(new HashMap<String , String>() {{ put("name", "counter2"); put("value", "1"); }} );
        add(new HashMap<String , String>() {{ put("name", "counter2"); put("value", "1"); }} );
    }};

    @GetMapping
    public List<Map<String, String>> counter() {
        return counters;
    }
}
