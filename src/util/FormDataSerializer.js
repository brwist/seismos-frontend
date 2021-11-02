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
            // "layer": formData.layer,
            "loop": formData.loop,
            "method": formData.method,
            "model": formData.model,
            "new_sample_rate": formData.new_sample_rate,
            "response": formData.response,
            "source": formData.source,
            "tolerance": formData.tolerence,
            // "total_width": formData.total_width,
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
            // "breaker": formData.breaker,
            "diverter_time": formData.diverter_time,
            "eta_cp": formData.eta_cp,
            "ffkw_correction": formData.ffkw_correction,
            // "fit_end_point": formData.fit_end_point,
            // "fit_iterations": formData.fit_iterations,
            "fuild_density": formData.fluid_density,
            "fuildt": formData.fluid_t,
            "k_mpa": formData.k_mpa,
            "met_res": formData.met_res,
            // "ng": formData.ng,
            "nu_lim": formData.nu_lim,
            "overburden": formData.overburden,
            "per_red": formData.perRed,
            // "plotraw": formData.plotraw,
            "poisson": formData.poisson,
            // "poisson_method": formData.poisson_method,
            // "poisson_var": formData.poisson_var,
            "pres": formData.pres,
            "shadow": formData.shadow,
            // "skip_losses": formData.skip_losses,
            "st_lim": formData.st_lim,
            // "stage_ques": formData.stage_ques,
            "start1": formData.start1,
            // "start2": formData.start2,
            // "stress_shadow": formData.stress_shadow,
            "tect": formData.tect,
            // "use_wncuts": formData.use_wncuts,
            // "use_wns": formData.use_wns,
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
            date: Number(dynamicFormNestItemValues.date.format('x')),
            customer: dynamicFormNestItemValues.customer,
            well: dynamicFormNestItemValues.well,
            stage: dynamicFormNestItemValues.stage,
            bht_f: dynamicFormNestItemValues.bht_f,
            bht_psi: dynamicFormNestItemValues.bht_psi,
            frac_design: dynamicFormNestItemValues.frac_design,
            // field_engineer: {
            //     days: dynamicFormNestItemValues.field_engineer_days,
            //     nights: dynamicFormNestItemValues.field_engineer_nights,
            // },
            plug_type: dynamicFormNestItemValues.plug_type,
            plug_seat_technique: dynamicFormNestItemValues.plug_seat_technique,
            did_an_event_occur: dynamicFormNestItemValues.event_occur,
            seismos_data_collection: dynamicFormNestItemValues.seismos_data_collection,
        },
        perforation_interval_information: {
            top_perf: perforationIntervalInformationValues.top_perf,
            bottom_perf: perforationIntervalInformationValues.bottom_perf,
            plug_depth: perforationIntervalInformationValues.plug_depth,
            n_clusters: Number(perforationIntervalInformationValues.clusters_number),
            perf_gun_description: perforationIntervalInformationValues.perf_gun_desc,
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
            stage_start_time: Number(stageDataValues.stage_end_time.format('x')),
            stage_end_time: Number(stageDataValues.stage_end_time.format('x')),
            opening_well: stageDataValues.opening_well,
            isip: stageDataValues.isip,
            stage_uuid: stageDataValues.stage_uuid,
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
            pulsing_parameters: {
                wave_type: activeDataFormValues.wave_type,
                period: activeDataFormValues.period,
                freq: activeDataFormValues.frequency,
                offset: activeDataFormValues.offset,
                amplitude: activeDataFormValues.amplitude,
            },
            pre_frac_pulses: {start_time: Number(activeDataFormValues.pre_start_time.format('x')), end_time: Number(activeDataFormValues.pre_end_time.format('x')), n_pulses: Number(activeDataFormValues.pre_number_of_pulses)},
            post_frac_pulses: {start_time: Number(activeDataFormValues.post_start_time.format('x')), end_time: Number(activeDataFormValues.post_end_time.format('x')), n_pulses: Number(activeDataFormValues.post_number_of_pulses)},
        },
        notes: {
            pre_frac_pulses: notesDataFormValues.pre_notes,
            post_frac_pulses: notesDataFormValues.post_notes,
            other: notesDataFormValues.other_notes,
        }
    }
}

const trackingSheetPopulateDataSerializer = (trackingSheetData) => {
    const dynamicFormNestItemValuesData = {
        bht_f: trackingSheetData.bottomhole_bht, // 
        bht_psi: trackingSheetData.bottomhole_bhp, //
        customer: trackingSheetData.customer, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        date: moment(trackingSheetData.date), // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        event_occur: trackingSheetData.stage_event, //
        frac_design: trackingSheetData.frac_design,
        plug_seat_technique: trackingSheetData.plug_seat_technique, //
        plug_type: trackingSheetData.plug_type, //
        seismos_data_collection: trackingSheetData.seismos_data_collection, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        stage: trackingSheetData.stage, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        well: trackingSheetData.well, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
    };
    const perforationIntervalInformationValuesData = {
        acid: trackingSheetData.chem_fluids.acid, //
        bottom_perf: trackingSheetData.perforation.bottom_measured_depth, //
        clusters_number: trackingSheetData.number_of_cluster, //
        displacement_vol_bottom: trackingSheetData.bottom_perf, // x mismatch datatype: {request: String, response: Float(0.0)}
        displacement_vol_plug: trackingSheetData.plug_name, //
        displacement_vol_top: trackingSheetData.top_perf, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        diverter_type: trackingSheetData.diverter_type, //
        perf_daiameter: trackingSheetData.perforation.estimated_hole_diameter, //
        perf_gun_desc: trackingSheetData.perforation.perf_gun_description, //
        plug_depth: trackingSheetData.plug_depth, //
        pumped_diverter: trackingSheetData.pumped_diverter, //
        spf: trackingSheetData.spf, // 
        top_perf: trackingSheetData.perforation.top_measured_depth //
    };
    const stageDataValuesData = {
        stage_start_time: moment(trackingSheetData.stage_start_time), // incorrect data received {request: 1634166213042, response: 1634166213}
        stage_end_time: moment(trackingSheetData.stage_end_time),  // incorrect data received {request: 1634166213042, response: 1634166213}
        opening_well: trackingSheetData.opening_well, // x Data not present on response (Decide to either remove from Frontend or else FE needs data back in response)
        isip: trackingSheetData.stage_avg.isip, //
        base_fluid_type: trackingSheetData.chem_fluids.base_fluid_type, //
        base_fluid_density: trackingSheetData.base_fluid_density, // x mismatch datatype: {request: String, response: Float (0.0)}
        max_conc_density: trackingSheetData.max_conc_density, // x mismatch datatype: {request: String , response: Float (0.0)}
        max_prop_conc_ppa_design: trackingSheetData.designed_max_prop, //
        max_prop_conc_ppa_actual: trackingSheetData.stage_avg.max_prop_conc, //
        total_pad_volume_bbls_design: trackingSheetData.designed_pad_vol, //
        total_pad_volume_bbls_actual: trackingSheetData.stage_avg.pad_vol, //
        total_clean_fluid_volume_bbls_design: trackingSheetData.designed_total_clean_fluid_volume, //
        total_clean_fluid_volume_bbls_actual: trackingSheetData.stage_avg.total_clean, //
        total_proppant_lbs_design: trackingSheetData.proppant[0].designed_lbs, // request is not in array but response came in array (request: pumping_summary.total_proppant.design, response -> proppant: [{design_lbs}])
        total_proppant_lbs_actual: trackingSheetData.proppant[0].actual_lbs, // request is not in array but response came in array (request -> pumping_summary.total_proppant.actual, response -> proppant: [{actual_lbs}])
        acid_volume_gals_design: trackingSheetData.designed_acid_vol, //
        acid_volume_gals_actual: trackingSheetData.stage_avg.acid, //
        flush_volume_bbls_design: trackingSheetData.designed_flush_vol, //
        flush_volume_bbls_actual: trackingSheetData.stage_avg.flush_volume, //
        slurry_volume_bbls_design: trackingSheetData.designed_slurry_vol, //
        slurry_volume_bbls_actual: trackingSheetData.stage_avg.total_slurry, //
    };
    const fluidFormValuesData = {
        fluidData: trackingSheetData.chem_fluids.fluids_items // 
    };
    const propantFormValuesData = {
        proppantData: trackingSheetData.proppant.map(p => {
            return  {
                bulk_density: p.bulk_density,
                description: p.proppant_name,
                specific_gravity: p.specific_gravity,
                amount_pumped: p.total_proppant_volume
            }
        })
    };
    const activeDataFormValuesData = {
        wave_type: trackingSheetData.active_data.wave_type, //
        period: trackingSheetData.period, // x mismatch datatype: {request: String, response: Int (0)}
        frequency: trackingSheetData.freq, // x mismatch datatype: {request: String, response: Float (0.0)}
        offset: trackingSheetData.offset, // x mismatch datatype: {request: String, response: Int (0)}
        amplitude: trackingSheetData.amplitude, // x mismatch datatype: {request: String, response: Int (0)}
        pre_start_time: moment(trackingSheetData.active_data.pre_frac_start_time), // incorrect data received {request: 1633993501224, response: 2147483647}
        pre_end_time: moment(trackingSheetData.active_data.pre_frac_end_time), // incorrect data received {request: 1634166302558, response: 2147483647}
        pre_number_of_pulses: trackingSheetData.active_data.pre_frac_num_pulse,
        post_start_time: moment(trackingSheetData.active_data.post_frac_start_time), // incorrect data received {request: 1635289510424, response: 2147483647}
        post_end_time: moment(trackingSheetData.active_data.post_frac_end_time), // incorrect data received {request: 1635462311758, response: 2147483647}
        post_number_of_pulses: trackingSheetData.active_data.post_frac_num_pulse,
    }
    const notesDataFormValuesData = {
        pre_notes: trackingSheetData.active_data.pre_frac_pulse_note, //
        post_notes: trackingSheetData.active_data.post_frac_pulse_note, //
        other_notes: trackingSheetData.active_data.additional_note, //
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