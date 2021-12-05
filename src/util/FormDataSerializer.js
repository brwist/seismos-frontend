import moment from "moment";

const defultValueFormSubmitSerializer = (formData) => {
    return {
        "default_advance_val": {
        "algorithm": formData.algorithm,
        "compresssibility": formData.compressibility,
        "data_sample_rate": formData.data_sample_rate,
        "density": formData.density,
        "f_high_hz": formData.f_high_hz,
        "f_low_hz": formData.f_low_hz,
        "grid_density": formData.grid_density,
        "interation": formData.iterations,
        "layer": formData.layer,
        "loop": formData.loop,
        "method": formData.method,
        "model": formData.model,
        "new_sample_rate": formData.new_sample_rate,
        "response": formData.response,
        "source": formData.source,
        "tolerance": formData.tolerence,
        "total_width": formData.total_width,
        "viscosity": formData.viscosity,
        "weighting": formData.weighting,
        "wlevexp": formData.wlevexp,
        },
        "default_param_val": {
        "c1_max": formData.c1_max,
        "c1_min": formData.c1_min,
        "c2_max": formData.c2_max,
        "c2_min": formData.c2_min,
        "c3_max": formData.c3_max,
        "c3_min": formData.c3_min,
        "k_max": formData.k_max,
        "k_min": formData.k_min,
        "q_max": formData.q_max,
        "q_min": formData.q_min,
        },
        "default_value": {
        "beta_ss": formData.beta_ss,
        "biot": formData.biot,
        "breaker_YN": formData.breaker_YN,
        "diverter_time": formData.diverter_time,
        "eta_cp": formData.eta_cp,
        "ffkw_correction": formData.ffkw_correction,
        "fit_end_point": formData.fit_end_point,
        "fit_iteration": formData.fit_iteration,
        "fuild_density": formData.fluid_density,
        "fuildt": formData.fluid_t,
        "k_mpa": formData.k_mpa,
        "met_res": formData.met_res,
        "NG": formData.NG,
        "nu_lim": formData.nu_lim,
        "overburden": formData.overburden,
        "per_red": formData.perRed,
        "plotraw_YN": formData.plotraw_YN,
        "poisson": formData.poisson,
        "passion_method": formData.passion_method,
        "poisson_var_YN": formData.poisson_var_YN,
        "pres": formData.pres,
        "shadow": formData.shadow,
        "skip_losses_YN": formData.skip_losses_YN,
        "st_lim": formData.st_lim,
        "stage_ques": formData.stage_ques,
        "start1": formData.start1,
        "strat2": formData.strat2,
        "stress_shadow_YN": formData.stress_shadow_YN,
        "tect": formData.tect,
        "use_wncuts_YN": formData.use_wncuts_YN,
        "use_wns_YN": formData.use_wns_YN,
        "young": formData.young,
        }
    }
}

const trackingSheetSubmitSerializer = (
        selectedStage,
        dynamicFormNestItemValues,
        perforationIntervalInformationValues,
        stageDataValues,
        propantFormValues,
        fluidFormValues,
        activeDataFormValues,
        notesDataFormValues
    ) => {
    return {
        stage: Number(selectedStage),
        stage_tracking: {
            bottomhole_bht: dynamicFormNestItemValues.bottomhole_bht,
            bottomhole_bhp: dynamicFormNestItemValues.bottomhole_bhp,
            did_an_event_occur: dynamicFormNestItemValues.did_an_event_occur,
            frac_design: dynamicFormNestItemValues.frac_design,
            plug_seat_technique: dynamicFormNestItemValues.plug_seat_technique,
            plug_type: dynamicFormNestItemValues.plug_type,
            seismos_data_collection: dynamicFormNestItemValues.seismos_data_collection,
        },
        perforation_interval_information: {
            top_measured_depth: perforationIntervalInformationValues.top_measured_depth,
            bottom_measured_depth: perforationIntervalInformationValues.bottom_measured_depth,
            plug_depth: perforationIntervalInformationValues.plug_depth,
            n_clusters: Number(perforationIntervalInformationValues.n_clusters),
            perf_gun_description: perforationIntervalInformationValues.perf_gun_description,
            perf_daiameter: perforationIntervalInformationValues.perf_daiameter,
            spf: perforationIntervalInformationValues.spf,
            pumped_diverter: perforationIntervalInformationValues.pumped_diverter,
            diverter_type: perforationIntervalInformationValues.diverter_type,
            acid: perforationIntervalInformationValues.acid,
            displacement_volume: {
                top_perf: perforationIntervalInformationValues.displacement_vol_top,
                bottom_perf: perforationIntervalInformationValues.displacement_vol_bottom,
                plug: perforationIntervalInformationValues.displacement_vol_plug,
            }
        },
        stage_data: {
            stage_start_time: Number(stageDataValues.stage_start_time.format('x')),
            stage_end_time: Number(stageDataValues.stage_end_time.format('x')),
            opening_well: stageDataValues.opening_well,
            // isip: stageDataValues.isip,
            fluid_parameters: {
                base_fluid_type: stageDataValues.base_fluid_type,
                base_fluid_density: stageDataValues.base_fluid_density,
                max_conc_density: stageDataValues.max_conc_density,
            },
            fluids_injected_into_formation: fluidFormValues.fluidData,
            proppant_data: propantFormValues.proppantData,
            pumping_summary: {
                max_prop_conc: {design: stageDataValues.max_prop_conc_ppa_design, actual: stageDataValues.max_prop_conc_ppa_actual},
                total_pad_volume: {design: stageDataValues.total_pad_volume_bbls_design, actual: stageDataValues.total_pad_volume_bbls_actual},
                total_clean_fluid_volume: {design: stageDataValues.total_clean_fluid_volume_bbls_design, actual: stageDataValues.total_clean_fluid_volume_bbls_actual},
                total_proppant: {design: stageDataValues.total_proppant_lbs_design, actual: stageDataValues.total_proppant_lbs_actual},
                acid_volume: {design: stageDataValues.acid_volume_gals_design, actual: stageDataValues.acid_volume_gals_actual},
                flush_volume: {design: stageDataValues.flush_volume_bbls_design, actual: stageDataValues.flush_volume_bbls_actual},
                slurry_volume: {design: stageDataValues.slurry_volume_bbls_design, actual: stageDataValues.slurry_volume_bbls_actual},
            }
        
        },
        active_data: {
            pulsing_parameteres: {
                wave_type: activeDataFormValues.wave_type,
                period: activeDataFormValues.period,
                frequency: activeDataFormValues.frequency,
                offset: activeDataFormValues.offset,
                amplitude: activeDataFormValues.amplitude,
            },
            pre_frac_pulses: {pre_frac_start_time: Number(activeDataFormValues.pre_frac_start_time.format('x')), pre_frac_end_time: Number(activeDataFormValues.pre_frac_end_time.format('x')), pre_frac_num_pulse: Number(activeDataFormValues.pre_frac_num_pulse)},
            post_frac_pulses: {post_frac_start_time: Number(activeDataFormValues.post_frac_start_time.format('x')), post_frac_end_time: Number(activeDataFormValues.post_frac_end_time.format('x')), post_frac_num_pulse: Number(activeDataFormValues.post_frac_num_pulse)},
        },
        notes: {
            pre_frac_pulse_note: notesDataFormValues.pre_frac_pulse_note,
            post_frac_pulse_note: notesDataFormValues.post_frac_pulse_note,
            additional_note: notesDataFormValues.additional_note,
        }
    }
}

const trackingSheetPopulateDataSerializer = (trackingSheetData) => {
    const dynamicFormNestItemValuesData = {
        bottomhole_bht: trackingSheetData.stage_tracking.bottomhole_bht,
        bottomhole_bhp: trackingSheetData.stage_tracking.bottomhole_bhp,
        did_an_event_occur: trackingSheetData.stage_tracking.did_an_event_occur,
        frac_design: trackingSheetData.stage_tracking.frac_design,
        plug_seat_technique: trackingSheetData.stage_tracking.plug_seat_technique,
        plug_type: trackingSheetData.stage_tracking.plug_type,
        seismos_data_collection: trackingSheetData.stage_tracking.seismos_data_collection,
    };
    const perforationIntervalInformationValuesData = {
        acid: trackingSheetData.perforation_interval_information.acid,
        bottom_measured_depth: trackingSheetData.perforation_interval_information.bottom_measured_depth,
        n_clusters: trackingSheetData.perforation_interval_information.n_clusters,
        displacement_vol_bottom: trackingSheetData.perforation_interval_information.displacement_volume.bottom_perf,
        displacement_vol_plug: trackingSheetData.perforation_interval_information.displacement_volume.plug,
        displacement_vol_top: trackingSheetData.perforation_interval_information.displacement_volume.top_perf,
        diverter_type: trackingSheetData.perforation_interval_information.diverter_type,
        perf_daiameter: trackingSheetData.perforation_interval_information.perf_daiameter,
        perf_gun_description: trackingSheetData.perforation_interval_information.perf_gun_description,
        plug_depth: trackingSheetData.perforation_interval_information.plug_depth,
        pumped_diverter: trackingSheetData.perforation_interval_information.pumped_diverter,
        spf: trackingSheetData.perforation_interval_information.spf,
        top_measured_depth: trackingSheetData.perforation_interval_information.top_measured_depth
    };
    const stageDataValuesData = {
        stage_start_time: moment(trackingSheetData.stage_data.stage_start_time),
        stage_end_time: moment(trackingSheetData.stage_data.stage_end_time),
        opening_well: trackingSheetData.stage_data.opening_well,
        // isip: trackingSheetData.stage_data.isip,
        base_fluid_type: trackingSheetData.stage_data.fluid_parameters.base_fluid_type,
        base_fluid_density: trackingSheetData.stage_data.fluid_parameters.base_fluid_density,
        max_conc_density: trackingSheetData.stage_data.fluid_parameters.max_conc_density,
        max_prop_conc_ppa_design: trackingSheetData.stage_data.pumping_summary.max_prop_conc.design,
        max_prop_conc_ppa_actual: trackingSheetData.stage_data.pumping_summary.max_prop_conc.actual,
        total_pad_volume_bbls_design: trackingSheetData.stage_data.pumping_summary.total_pad_volume.design,
        total_pad_volume_bbls_actual: trackingSheetData.stage_data.pumping_summary.total_pad_volume.actual,
        total_clean_fluid_volume_bbls_design: trackingSheetData.stage_data.pumping_summary.total_clean_fluid_volume.design,
        total_clean_fluid_volume_bbls_actual: trackingSheetData.stage_data.pumping_summary.total_clean_fluid_volume.actual,
        total_proppant_lbs_design: trackingSheetData.stage_data.pumping_summary.total_proppant.design,
        total_proppant_lbs_actual: trackingSheetData.stage_data.pumping_summary.total_proppant.actual,
        acid_volume_gals_design: trackingSheetData.stage_data.pumping_summary.acid_volume.design,
        acid_volume_gals_actual: trackingSheetData.stage_data.pumping_summary.acid_volume.actual,
        flush_volume_bbls_design: trackingSheetData.stage_data.pumping_summary.flush_volume.design,
        flush_volume_bbls_actual: trackingSheetData.stage_data.pumping_summary.flush_volume.actual,
        slurry_volume_bbls_design: trackingSheetData.stage_data.pumping_summary.slurry_volume.design,
        slurry_volume_bbls_actual: trackingSheetData.stage_data.pumping_summary.slurry_volume.actual,
    };
    const fluidFormValuesData = {
        fluidData: trackingSheetData.stage_data.fluids_injected_into_formation
    };
    const propantFormValuesData = {
        proppantData: trackingSheetData.stage_data.propant_data
    };
    const activeDataFormValuesData = {
        wave_type: trackingSheetData.active_data.pulsing_parameters.wave_type,
        period: trackingSheetData.active_data.pulsing_parameters.period,
        frequency: trackingSheetData.active_data.pulsing_parameters.frequency,
        offset: trackingSheetData.active_data.pulsing_parameters.offset,
        amplitude: trackingSheetData.active_data.pulsing_parameters.amplitude,
        pre_frac_start_time: moment(trackingSheetData.active_data.pre_frac_pulses.start_time),
        pre_frac_end_time: moment(trackingSheetData.active_data.pre_frac_pulses.pre_frac_end_time),
        pre_frac_num_pulse: trackingSheetData.active_data.pre_frac_pulses.pre_frac_num_pulse,
        post_frac_start_time: moment(trackingSheetData.active_data.post_frac_pulses.post_frac_start_time),
        post_frac_end_time: moment(trackingSheetData.active_data.post_frac_pulses.post_frac_end_time),
        post_frac_num_pulse: trackingSheetData.active_data.pre_frac_pulses.post_frac_num_pulse, 
    }
    const notesDataFormValuesData = {
        pre_frac_pulse_note: trackingSheetData.notes.pre_frac_pulse_note,
        post_frac_pulse_note: trackingSheetData.notes.post_frac_pulse_note,
        additional_note: trackingSheetData.notes.additional_note,
    }

    return {
        dynamicFormNestItemValuesData,
        perforationIntervalInformationValuesData,
        stageDataValuesData,
        propantFormValuesData,
        fluidFormValuesData,
        activeDataFormValuesData,
        notesDataFormValuesData,
    }
}
const FormDataSerializer = {
    defultValueFormSubmitSerializer,
    trackingSheetSubmitSerializer,
    trackingSheetPopulateDataSerializer
}

export default FormDataSerializer;