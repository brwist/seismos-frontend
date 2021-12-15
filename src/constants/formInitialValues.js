
const dynamicFormNestItemValues = {
    bottomhole_bht: null,
    bottomhole_bhp: null,
    did_an_event_occur: null,
    frac_design: null,
    plug_seat_technique: null,
    plug_type: null,
    seismos_data_collection: null,
}

const perforationIntervalInformationValues = {
    acid: null,
    bottom_measured_depth: null,
    n_clusters: null,
    displacement_vol_bottom: null,
    displacement_vol_plug: null,
    displacement_vol_top: null,
    diverter_type: null,
    perf_daiameter: null,
    perf_gun_description: null,
    plug_depth: null,
    pumped_diverter: null,
    spf: null,
    top_measured_depth: null
}

const stageDataValues = {
    stage_start_time: null,
    stage_end_time: null,
    opening_well: null,
    // isip: null,
    base_fluid_type: null,
    base_fluid_density: null,
    max_conc_density: null,
    max_prop_conc_ppa_design: null,
    max_prop_conc_ppa_actual: null,
    total_pad_volume_bbls_design: null,
    total_pad_volume_bbls_actual: null,
    total_clean_fluid_volume_bbls_design: null,
    total_clean_fluid_volume_bbls_actual: null,
    total_lbs_design: null,
    total_lbs_actual: null,
    total_sand_lbs_design: null,
    total_sand_lbs_actual: null,
    acid_volume_gals_design: null,
    acid_volume_gals_actual: null,
    flush_volume_bbls_design: null,
    flush_volume_bbls_actual: null,
    slurry_volume_bbls_design: null,
    slurry_volume_bbls_actual: null,
}
        
const propantFormValues = {
    proppantData: [
        {
            bulk_density: null,
            description: null,
            specific_gravity: null,
            amount_pumped: null
        }
    ]
}

const fluidFormValues = {
    fluidData: [
        {
            description: null,
            bbls: null,
            ppg: null
        }
    ]
}

const activeDataFormValues = {
    wave_type: null,
    amplitude: null,
    frequency: null,
    pre_frac_num_pulse: null,
    post_frac_num_pulse: null,
    offset: null,
    period: null,
    post_frac_end_time: null,
    post_frac_start_time: null,
    pre_frac_end_time: null,
    pre_frac_start_time: null,
}

const notesFataFormValues = {
    additional_note: null,
    pre_frac_pulse_note: null,
    post_frac_pulse_note: null
}

const defaultValueForm = {
    c1_min: 1350,
    c1_max: 1650,
    c2_min: 1350,
    c2_max: 1650,
    c3_min: 1350,
    c3_max: 1650,
    q_min: 1,
    q_max: 200,
    k_min: 0.001,
    k_max: 5000,
    model: "assymetric",  //x //x
    response: "full",  //x
    source: "reflection",  //x
    layer: 0,
    viscosity: 10.0,
    density: 1000,
    compresssibility: 1,
    f_low_hz: 0.01,
    f_high_hz: 2.5,
    new_sample_rate: 20.0,
    data_sample_rate: 20,
    algorithm: "DiffEvolv",  //x
    grid_density: 5,
    weighting: "No", //x
    wlevexp: 0.0001,
    loop: "No",  //x
    method: "fix_w",  //x
    total_width: 1.574804,
    tolerance: 0.01,
    interation: 10,
    company: 'Vesta',
    well: '4',
    pres: 0.33,
    young: 27000,
    overburden: 1.18,
    poisson: 0.25,
    eta_cp: 10,
    fuildt: 1,
    tect: 0.025,
    fuild_density: 8.33,
    diverter_time: 0.0,
    met_res: 1,
    ffkw_correction: 10000,
    k_mpa: 1000,
    nu_lim: 10,
    per_red: 46,
    start1: 120,
    beta_ss: 0.83,
    st_lim: 1,
    biot: 1,
    shadow: 300,
    fit_end_point: 0,
    strat2: 1,
    NG: 0,
    stage_ques: 0,
    breaker_YN: "N",
    poisson_var_YN: "Y",
    passion_method: 2,
    stress_shadow_YN: "Y",
    plotraw_YN: "N",
    skip_losses_YN: "N",
    use_wns_YN: "N",
    use_wncuts_YN: "N",
    fit_iteration: 50
}
const FormInitialValues = {
    dynamicFormNestItemValues,
    perforationIntervalInformationValues,
    stageDataValues,
    propantFormValues,
    fluidFormValues,
    activeDataFormValues,
    notesFataFormValues,
    defaultValueForm
}

export default FormInitialValues;