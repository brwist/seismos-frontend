
const dynamicFormNestItemValues = {
    bht_f: null,
    bht_psi: null,
    customer: null,
    date: null,
    event_occur: null,
    field_engineer_days: null,
    field_engineer_nights: null,
    frac_design: null,
    plug_seat_technique: null,
    plug_type: null,
    seismos_data_collection: null,
    stage: null,
    well: null
}

const perforationIntervalInformationValues = {
    acid: null,
    bottom_perf: null,
    clusters_number: null,
    displacement_vol_bottom: null,
    displacement_vol_plug: null,
    displacement_vol_top: null,
    diverter_type: null,
    perf_daiameter: null,
    perf_gun_desc: null,
    plug_depth: null,
    pumped_diverter: null,
    spf: null,
    top_perf: null
}

const stageDataValues = {
    stage_start_time: null,
    stage_end_time: null,
    opening_well: null,
    isip: null,
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
    amplitude: null,
    frequency: null,
    number_of_pulses: null,
    offset: null,
    periods: null,
    post_end_time: null,
    post_start_time: null,
    pre_end_time: null,
    pre_start_time: null,
}

const notesFataFormValues = {
    other_notes: null,
    pre_notes: null,
    post_notes: null
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
    compressibility: 1,
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
    tolerence: 0.01,
    iterations: 10,
    company: 'Vesta',
    well: '4',
    pres: 0.33,
    young: 27000,
    overburden: 1.18,
    poisson: 0.25,
    eta_cp: 10,
    fluid_t: 1,
    tect: 0.025,
    fluid_density: 8.33,
    diverter_time: 0.0,
    met_res: 1,
    ffkw_correction: 10000,
    k_mpa: 1000,
    nu_lim: 10,
    perRed: 46,
    start1: 120,
    beta_ss: 0.83,
    st_lim: 1,
    biot: 1,
    shadow: 300,
    fit_end_point: 0,
    start2: 1,
    ng: 0,
    stage_ques: '',
    breaker: "N",
    poisson_var: "Y",
    poisson_method: 2,
    stress_shadow: "Y",
    plotraw: "N",
    skip_losses: "N",
    use_wns: "N",
    use_wncuts: "N",
    fit_iterations: 50
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